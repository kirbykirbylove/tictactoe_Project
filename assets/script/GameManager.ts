// GameManager.ts
import { _decorator, Component, Prefab, Node, instantiate, SpriteFrame, Label, Color, Button, Sprite } from 'cc';
import { Cell } from './Cell';
const { ccclass, property } = _decorator;

enum CellState { Empty = 0, Player = 1, AI = 2 }

@ccclass('GameManager')
export class GameManager extends Component {
    @property(Prefab) cellPrefab: Prefab = null!;
    @property(Node)   gridNode: Node = null!;          // 放 9 個 Cell 的容器
    @property(Label)  statusLabel: Label = null!;
    @property(SpriteFrame) oSprite: SpriteFrame = null!;
    @property(SpriteFrame) xSprite: SpriteFrame = null!;
    @property(Button) resetButton: Button = null!;     // Reset 按鈕（可選，亦可在場景中綁 onClick）
    @property(Sprite) resultSprite: Sprite = null!;   // ⭐ 勝利顯示用的圈/叉

    private cells: Cell[] = [];
    private board: CellState[] = Array(9).fill(CellState.Empty);
    private playing = true;            // 遊戲進行中
    private playerTurn = true;         // true=玩家回合，false=AI 回合（防止玩家連點）

    private readonly wins = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6],
    ];

    start() {
        // 建格子（若場景已手動放入 9 個 Cell，也可改為抓取現有 children）
        this.createGrid();

        // 綁定 Reset（也可於編輯器直接綁定）
        if (this.resetButton) {
            this.resetButton.node.off(Button.EventType.CLICK);
            this.resetButton.node.on(Button.EventType.CLICK, this.resetGame, this);
        }

        this.resetGame();
    }

    /** 以 prefab 動態產生 9 個格子 */
    private createGrid() {
        if (this.gridNode.children.length === 9) {
            // 已手動放好 9 個 Cell，抓組件即可
            this.cells = this.gridNode.children.map((n, i) => {
                const c = n.getComponent(Cell)!;
                c.init(i, this);
                return c;
            });
            return;
        }

        this.gridNode.removeAllChildren();
        this.cells.length = 0;
        for (let i = 0; i < 9; i++) {
            const node = instantiate(this.cellPrefab);   // ⚠️ 必須在 Inspector 指定 cellPrefab
            this.gridNode.addChild(node);
            const cell = node.getComponent(Cell)!;
            cell.init(i, this);
            this.cells.push(cell);
        }
    }

    /** 玩家按下某格（由 Cell.onClick 轉來） */
    public handleCellClick(index: number) {
        if (!this.playing) return;
        if (!this.playerTurn) return;                  // 限制：玩家不能連續下
        if (this.board[index] !== CellState.Empty) return;

        // 玩家落子（O）
        this.board[index] = CellState.Player;
        this.cells[index].setMark('O', this.oSprite);

        // 檢查結束
        if (this.afterMoveCheck()) return;

        // 換 AI，暫時鎖玩家互動
        this.playerTurn = false;
        this.updateCellsInteractable(false);

        // 立即或延遲一點點模擬思考
        this.scheduleOnce(() => {
            this.aiMove();
            this.afterMoveCheck(); // AI 下完再檢查
            if (this.playing) {
                this.playerTurn = true;
                this.updateCellsInteractable(true);   // 只開放尚未落子的格子
            }
        }, 0.15);
    }

    /** AI 行動（X）：70% minimax、30% 隨機 */
    private aiMove() {
        if (!this.playing) return;

        const empties: number[] = [];
        for (let i = 0; i < 9; i++) if (this.board[i] === CellState.Empty) empties.push(i);
        if (empties.length === 0) return;

        let move = -1;
        if (Math.random() < 0.7) {
            // minimax
            let best = -Infinity;
            for (const i of empties) {
                this.board[i] = CellState.AI;
                const score = this.minimax(0, false);
                this.board[i] = CellState.Empty;
                if (score > best) { best = score; move = i; }
            }
        } else {
            // 隨機
            move = empties[(Math.random() * empties.length) | 0];
        }

        if (move === -1) move = empties[0];
        this.board[move] = CellState.AI;
        this.cells[move].setMark('X', this.xSprite);
    }

    /** 勝負/和局檢查，並更新 UI；回傳是否遊戲已結束 */
    private afterMoveCheck(): boolean {
        const winner = this.getWinner();
        if (winner === CellState.Player) {
            this.finishGame('WIN', new Color(255, 215, 0), this.oSprite);  // ⭐ 傳 O 圖
            return true;
        }
        if (winner === CellState.AI) {
            this.finishGame('WIN', new Color(255, 215, 0), this.xSprite);  // ⭐ 傳 X 圖
            return true;
        }
        if (this.board.every(c => c !== CellState.Empty)) {
            this.finishGame('A DRAW!!!', new Color(0, 128, 255), null);   // ⭐ 清掉圖
            return true;
        }
        return false;
    }

    private getWinner(): CellState {
        for (const [a, b, c] of this.wins) {
            const v = this.board[a];
            if (v !== CellState.Empty && v === this.board[b] && v === this.board[c]) return v;
        }
        return CellState.Empty;
    }

    // ⭐ 多加 spriteFrame 參數
    private finishGame(text: string, color: Color, sf: SpriteFrame | null) {
        this.playing = false;
        this.statusLabel.string = text;
        this.statusLabel.color = color;

        if (this.resultSprite) this.resultSprite.spriteFrame = sf;  // 設定圖案（或清空）
        this.updateCellsInteractable(false);
    }

    /** 人類回合時只啟用尚未落子之格子 */
    private updateCellsInteractable(yes: boolean) {
        for (let i = 0; i < 9; i++) {
            if (this.board[i] === CellState.Empty) this.cells[i].setInteractable(yes);
        }
    }

    /** minimax 評分器（AI 為 maximizing） */
    private minimax(depth: number, isMax: boolean): number {
        const w = this.getWinner();
        if (w === CellState.AI) return 10 - depth;
        if (w === CellState.Player) return depth - 10;
        if (this.board.every(c => c !== CellState.Empty)) return 0;

        if (isMax) {
            let best = -Infinity;
            for (let i = 0; i < 9; i++) if (this.board[i] === CellState.Empty) {
                this.board[i] = CellState.AI;
                best = Math.max(best, this.minimax(depth + 1, false));
                this.board[i] = CellState.Empty;
            }
            return best;
        } else {
            let best = Infinity;
            for (let i = 0; i < 9; i++) if (this.board[i] === CellState.Empty) {
                this.board[i] = CellState.Player;
                best = Math.min(best, this.minimax(depth + 1, true));
                this.board[i] = CellState.Empty;
            }
            return best;
        }
    }

    public resetGame() {
        this.playing = true;
        this.playerTurn = true;
        this.board.fill(CellState.Empty);
        this.statusLabel.string = '';
        if (this.resultSprite) this.resultSprite.spriteFrame = null;  // ⭐ 重置時清空

        this.cells.forEach((c, i) => c.init(i, this));
        this.updateCellsInteractable(true);
    }
}

