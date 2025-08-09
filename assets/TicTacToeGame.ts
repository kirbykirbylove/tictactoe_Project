import { _decorator, Component, Node, Button, Color, Label, Sprite, SpriteFrame, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

enum GameState {
    Playing,
    PlayerWin,
    AIWin,
    Draw
}

enum CellState {
    Empty = 0,
    Player = 1,  // 圈圈
    AI = 2       // 叉叉
}

@ccclass('TicTacToeGame')
export class TicTacToeGame extends Component {
    
    @property(Node)
    gameBoard: Node = null;
    
    @property(Button)
    resetButton: Button = null;
    
    @property(Label)
    statusLabel: Label = null;
    
    @property(SpriteFrame)
    circleSprite: SpriteFrame = null;  // 圈圈圖片
    
    @property(SpriteFrame)
    crossSprite: SpriteFrame = null;   // 叉叉圖片
    
    @property(SpriteFrame)
    emptySprite: SpriteFrame = null;   // 空格圖片

    @property(Sprite)
    resultIcon: Sprite = null;  // 用來顯示圈圈或叉叉圖片

    
    private gameState: GameState = GameState.Playing;
    private board: CellState[] = new Array(9).fill(CellState.Empty);
    private gridButtons: Button[] = [];
    
    // 获胜组合
    private readonly WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横排
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // 豎排
        [0, 4, 8], [2, 4, 6]             // 對角線
    ];
    
    start() {
        this.initializeGame();
        this.setupEventListeners();
    }
    
    private initializeGame() {
        // 初始化遊戲版
        this.board.fill(CellState.Empty);
        this.gameState = GameState.Playing;
        this.updateStatusText("");
        this.updateResultIcon(); // 不顯示 icon
        
        // 獲取所有格子按鈕
        this.gridButtons = [];
        for (let i = 0; i < 9; i++) {
            const button = this.gameBoard.children[i].getComponent(Button);
            this.gridButtons.push(button);
            this.updateCellSprite(i, CellState.Empty);
        }
    }
    
    private setupEventListeners() {
        // 設置格子按鈕事件
        for (let i = 0; i < 9; i++) {
            const button = this.gridButtons[i];
            button.node.on(Button.EventType.CLICK, () => this.onCellClick(i), this);
        }
        
        // 設置重製按鈕事件
        if (this.resetButton) {
            this.resetButton.node.on(Button.EventType.CLICK, this.resetGame, this);
        }
    }
    
    private onCellClick(index: number) {
        // 檢查遊戲狀態和格子是否為空
        if (this.gameState !== GameState.Playing || this.board[index] !== CellState.Empty) {
            return;
        }
        
        // 玩家下棋
        this.makeMove(index, CellState.Player);
        
        // 檢查遊戲是否結束
        if (this.checkGameEnd()) {
            return;
        }
        
        // AI下棋
        this.scheduleOnce(() => {
            this.makeAIMove();
            this.checkGameEnd();
        }, 0.5); // 延遲0.5秒讓AI下棋
    }
    
    private makeMove(index: number, player: CellState) {
        this.board[index] = player;
        this.updateCellSprite(index, player);
    }
    
    private makeAIMove() {
        if (this.gameState !== GameState.Playing) {
            return;
        }
        
        const bestMove = this.getBestMove();
        if (bestMove !== -1) {
            this.makeMove(bestMove, CellState.AI);
        }
    }
    
    private getBestMove(): number {
        const emptyIndices: number[] = [];
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === CellState.Empty) {
                emptyIndices.push(i);
            }
        }

        // 中等難度策略：70% 使用 Minimax，30% 隨機走
        const useMinimax = Math.random() < 0.7;

        if (useMinimax) {
            let bestScore = -Infinity;
            let bestMove = -1;

            for (const i of emptyIndices) {
                this.board[i] = CellState.AI;
                const score = this.minimax(0, false);
                this.board[i] = CellState.Empty;

                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }

            return bestMove;
        } else {
            const randomIndex = Math.floor(Math.random() * emptyIndices.length);
            return emptyIndices[randomIndex];
        }
    }

    private minimax(depth: number, isMaximizing: boolean): number {
        const winner = this.getWinner();
        
        if (winner === CellState.AI) return 10 - depth;
        if (winner === CellState.Player) return depth - 10;
        if (this.isBoardFull()) return 0;
        
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (this.board[i] === CellState.Empty) {
                    this.board[i] = CellState.AI;
                    const score = this.minimax(depth + 1, false);
                    this.board[i] = CellState.Empty;
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (this.board[i] === CellState.Empty) {
                    this.board[i] = CellState.Player;
                    const score = this.minimax(depth + 1, true);
                    this.board[i] = CellState.Empty;
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    }
    
private checkGameEnd(): boolean {
    const winner = this.getWinner();
    
    if (winner === CellState.Player) {
        this.gameState = GameState.PlayerWin;
        this.updateStatusText("Win", new Color(255, 215, 0));// 黃色
        this.updateResultIcon(this.circleSprite);

        // this.updateStatusLabel(
        //     "WIN",
        //     new Color(255, 215, 0), // 黃色
        //     this.circleSprite
        // );
        return true;
    } else if (winner === CellState.AI) {
        this.gameState = GameState.AIWin;
        this.updateStatusText("Win", new Color(255, 215, 0));// 黃色
        this.updateResultIcon(this.crossSprite);
        // this.updateStatusLabel(
        //     "WIN",
        //     new Color(255, 215, 0), // 黃色
        //     this.crossSprite
        // );
        return true;
    } else if (this.isBoardFull()) {
        this.gameState = GameState.Draw;
        this.updateStatusText("A Draw!!!", new Color(0, 128, 255));// 藍色
        this.updateResultIcon();
        // this.updateStatusLabel(
        //     "A DRAW!!!",
        //     new Color(0, 128, 255), // 藍色
        //     null
        // );
        return true;
    }
    
    return false;
}
    
    private getWinner(): CellState {
        for (const combination of this.WINNING_COMBINATIONS) {
            const [a, b, c] = combination;
            if (this.board[a] !== CellState.Empty && 
                this.board[a] === this.board[b] && 
                this.board[b] === this.board[c]) {
                return this.board[a];
            }
        }
        return CellState.Empty;
    }
    
    private isBoardFull(): boolean {
        return this.board.every(cell => cell !== CellState.Empty);
    }
    
    private updateCellSprite(index: number, state: CellState) {
        const button = this.gridButtons[index];
        const sprite = button.node.getComponent(Sprite);
        
        switch (state) {
            case CellState.Player:
                sprite.spriteFrame = this.circleSprite;
                break;
            case CellState.AI:
                sprite.spriteFrame = this.crossSprite;
                break;
            case CellState.Empty:
            default:
                sprite.spriteFrame = this.emptySprite;
                break;
        }
    }
    
    // private updateStatusLabel(text: string, color?: Color, iconSprite?: SpriteFrame) {
    //     if (this.statusLabel) {
    //         this.statusLabel.string = text;
    //         if (color) {
    //             this.statusLabel.color = color;
    //         }
    //     }
    //     if (this.resultIcon) {
    //         if (iconSprite) {
    //             this.resultIcon.spriteFrame = iconSprite;
    //             this.resultIcon.node.active = true;
    //         } else {
    //             this.resultIcon.node.active = false;
    //         }
    //     }
    // }

    private updateStatusText(text: string, color?: Color) {
    this.statusLabel.string = text;
    if (color) {
        this.statusLabel.color = color;
    }
}

    private updateResultIcon(sprite?: SpriteFrame) {
        if (sprite) {
            this.resultIcon.node.active = true;
            this.resultIcon.spriteFrame = sprite;
        } else {
            this.resultIcon.node.active = false;
        }
    }

    
    private resetGame() {
        this.initializeGame();
    }
}

