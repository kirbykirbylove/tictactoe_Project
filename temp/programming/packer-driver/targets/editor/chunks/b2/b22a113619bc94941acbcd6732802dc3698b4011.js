System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Button, Color, Label, Sprite, SpriteFrame, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _crd, ccclass, property, GameState, CellState, TicTacToeGame;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'transform-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Button = _cc.Button;
      Color = _cc.Color;
      Label = _cc.Label;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "21b11vnhApDJJxLBTaZcrk/", "TicTacToeGame", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Button', 'Color', 'Label', 'Sprite', 'SpriteFrame', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      GameState = /*#__PURE__*/function (GameState) {
        GameState[GameState["Playing"] = 0] = "Playing";
        GameState[GameState["PlayerWin"] = 1] = "PlayerWin";
        GameState[GameState["AIWin"] = 2] = "AIWin";
        GameState[GameState["Draw"] = 3] = "Draw";
        return GameState;
      }(GameState || {});

      CellState = /*#__PURE__*/function (CellState) {
        CellState[CellState["Empty"] = 0] = "Empty";
        CellState[CellState["Player"] = 1] = "Player";
        CellState[CellState["AI"] = 2] = "AI";
        return CellState;
      }(CellState || {});

      _export("TicTacToeGame", TicTacToeGame = (_dec = ccclass('TicTacToeGame'), _dec2 = property(Node), _dec3 = property(Button), _dec4 = property(Label), _dec5 = property(SpriteFrame), _dec6 = property(SpriteFrame), _dec7 = property(SpriteFrame), _dec8 = property(Sprite), _dec(_class = (_class2 = class TicTacToeGame extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "gameBoard", _descriptor, this);

          _initializerDefineProperty(this, "resetButton", _descriptor2, this);

          _initializerDefineProperty(this, "statusLabel", _descriptor3, this);

          _initializerDefineProperty(this, "circleSprite", _descriptor4, this);

          // 圈圈圖片
          _initializerDefineProperty(this, "crossSprite", _descriptor5, this);

          // 叉叉圖片
          _initializerDefineProperty(this, "emptySprite", _descriptor6, this);

          // 空格圖片
          _initializerDefineProperty(this, "resultIcon", _descriptor7, this);

          // 用來顯示圈圈或叉叉圖片
          this.gameState = GameState.Playing;
          this.board = new Array(9).fill(CellState.Empty);
          this.gridButtons = [];
          // 获胜组合
          this.WINNING_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], // 横排
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // 豎排
          [0, 4, 8], [2, 4, 6] // 對角線
          ];
        }

        start() {
          this.initializeGame();
          this.setupEventListeners();
        }

        initializeGame() {
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

        setupEventListeners() {
          // 設置格子按鈕事件
          for (let i = 0; i < 9; i++) {
            const button = this.gridButtons[i];
            button.node.on(Button.EventType.CLICK, () => this.onCellClick(i), this);
          } // 設置重製按鈕事件


          if (this.resetButton) {
            this.resetButton.node.on(Button.EventType.CLICK, this.resetGame, this);
          }
        }

        onCellClick(index) {
          // 檢查遊戲狀態和格子是否為空
          if (this.gameState !== GameState.Playing || this.board[index] !== CellState.Empty) {
            return;
          } // 玩家下棋


          this.makeMove(index, CellState.Player); // 檢查遊戲是否結束

          if (this.checkGameEnd()) {
            return;
          } // AI下棋


          this.scheduleOnce(() => {
            this.makeAIMove();
            this.checkGameEnd();
          }, 0.5); // 延遲0.5秒讓AI下棋
        }

        makeMove(index, player) {
          this.board[index] = player;
          this.updateCellSprite(index, player);
        }

        makeAIMove() {
          if (this.gameState !== GameState.Playing) {
            return;
          }

          const bestMove = this.getBestMove();

          if (bestMove !== -1) {
            this.makeMove(bestMove, CellState.AI);
          }
        }

        getBestMove() {
          const emptyIndices = [];

          for (let i = 0; i < 9; i++) {
            if (this.board[i] === CellState.Empty) {
              emptyIndices.push(i);
            }
          } // 中等難度策略：70% 使用 Minimax，30% 隨機走


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

        minimax(depth, isMaximizing) {
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

        checkGameEnd() {
          const winner = this.getWinner();

          if (winner === CellState.Player) {
            this.gameState = GameState.PlayerWin;
            this.updateStatusText("Win", new Color(255, 215, 0)); // 黃色

            this.updateResultIcon(this.circleSprite); // this.updateStatusLabel(
            //     "WIN",
            //     new Color(255, 215, 0), // 黃色
            //     this.circleSprite
            // );

            return true;
          } else if (winner === CellState.AI) {
            this.gameState = GameState.AIWin;
            this.updateStatusText("Win", new Color(255, 215, 0)); // 黃色

            this.updateResultIcon(this.crossSprite); // this.updateStatusLabel(
            //     "WIN",
            //     new Color(255, 215, 0), // 黃色
            //     this.crossSprite
            // );

            return true;
          } else if (this.isBoardFull()) {
            this.gameState = GameState.Draw;
            this.updateStatusText("A Draw!!!", new Color(0, 128, 255)); // 藍色

            this.updateResultIcon(); // this.updateStatusLabel(
            //     "A DRAW!!!",
            //     new Color(0, 128, 255), // 藍色
            //     null
            // );

            return true;
          }

          return false;
        }

        getWinner() {
          for (const combination of this.WINNING_COMBINATIONS) {
            const [a, b, c] = combination;

            if (this.board[a] !== CellState.Empty && this.board[a] === this.board[b] && this.board[b] === this.board[c]) {
              return this.board[a];
            }
          }

          return CellState.Empty;
        }

        isBoardFull() {
          return this.board.every(cell => cell !== CellState.Empty);
        }

        updateCellSprite(index, state) {
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
        } // private updateStatusLabel(text: string, color?: Color, iconSprite?: SpriteFrame) {
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


        updateStatusText(text, color) {
          this.statusLabel.string = text;

          if (color) {
            this.statusLabel.color = color;
          }
        }

        updateResultIcon(sprite) {
          if (sprite) {
            this.resultIcon.node.active = true;
            this.resultIcon.spriteFrame = sprite;
          } else {
            this.resultIcon.node.active = false;
          }
        }

        resetGame() {
          this.initializeGame();
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gameBoard", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "resetButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "statusLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "circleSprite", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "crossSprite", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "emptySprite", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "resultIcon", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=b22a113619bc94941acbcd6732802dc3698b4011.js.map