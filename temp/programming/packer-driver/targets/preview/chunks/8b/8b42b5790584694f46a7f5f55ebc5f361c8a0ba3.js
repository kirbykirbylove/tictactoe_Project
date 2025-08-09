System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Button, Label, Sprite, SpriteFrame, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _crd, ccclass, property, GameState, CellState, Difficulty, TicTacToeGame;

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
      Label = _cc.Label;
      Sprite = _cc.Sprite;
      SpriteFrame = _cc.SpriteFrame;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7cc61cqiSRD9rPauu0SVNyp", "TicTacToeGame", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Button', 'Label', 'Sprite', 'SpriteFrame', 'Vec3']);

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

      Difficulty = /*#__PURE__*/function (Difficulty) {
        Difficulty[Difficulty["Easy"] = 0] = "Easy";
        Difficulty[Difficulty["Medium"] = 1] = "Medium";
        Difficulty[Difficulty["Hard"] = 2] = "Hard";
        return Difficulty;
      }(Difficulty || {});

      _export("TicTacToeGame", TicTacToeGame = (_dec = ccclass('TicTacToeGame'), _dec2 = property(Node), _dec3 = property(Button), _dec4 = property(Label), _dec5 = property(SpriteFrame), _dec6 = property(SpriteFrame), _dec7 = property(SpriteFrame), _dec8 = property(Node), _dec9 = property(Button), _dec10 = property(Button), _dec11 = property(Button), _dec12 = property(Button), _dec13 = property(Label), _dec(_class = (_class2 = class TicTacToeGame extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "gameBoard", _descriptor, this);

          _initializerDefineProperty(this, "resetButton", _descriptor2, this);

          _initializerDefineProperty(this, "statusLabel", _descriptor3, this);

          _initializerDefineProperty(this, "circleSprite", _descriptor4, this);

          // 圈圈图片
          _initializerDefineProperty(this, "crossSprite", _descriptor5, this);

          // 叉叉图片
          _initializerDefineProperty(this, "emptySprite", _descriptor6, this);

          // 空格图片
          // 难度选择UI
          _initializerDefineProperty(this, "difficultyMenu", _descriptor7, this);

          // 难度选择菜单
          _initializerDefineProperty(this, "easyButton", _descriptor8, this);

          _initializerDefineProperty(this, "mediumButton", _descriptor9, this);

          _initializerDefineProperty(this, "hardButton", _descriptor10, this);

          _initializerDefineProperty(this, "backToMenuButton", _descriptor11, this);

          // 返回菜单按钮
          _initializerDefineProperty(this, "difficultyLabel", _descriptor12, this);

          // 显示当前难度
          this.gameState = GameState.Playing;
          this.board = new Array(9).fill(CellState.Empty);
          this.gridButtons = [];
          this.currentDifficulty = Difficulty.Medium;
          this.isInGame = false;
          // 获胜组合
          this.WINNING_COMBINATIONS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], // 横排
          [0, 3, 6], [1, 4, 7], [2, 5, 8], // 竖排
          [0, 4, 8], [2, 4, 6] // 对角线
          ];
        }

        start() {
          this.showDifficultyMenu();
          this.setupEventListeners();
        }

        showDifficultyMenu() {
          this.isInGame = false;

          if (this.difficultyMenu) {
            this.difficultyMenu.active = true;
          }

          if (this.gameBoard) {
            this.gameBoard.active = false;
          }

          if (this.resetButton) {
            this.resetButton.node.active = false;
          }

          if (this.backToMenuButton) {
            this.backToMenuButton.node.active = false;
          }

          if (this.statusLabel) {
            this.statusLabel.string = "选择难度开始游戏";
          }

          if (this.difficultyLabel) {
            this.difficultyLabel.node.active = false;
          }
        }

        startGame(difficulty) {
          this.currentDifficulty = difficulty;
          this.isInGame = true;

          if (this.difficultyMenu) {
            this.difficultyMenu.active = false;
          }

          if (this.gameBoard) {
            this.gameBoard.active = true;
          }

          if (this.resetButton) {
            this.resetButton.node.active = true;
          }

          if (this.backToMenuButton) {
            this.backToMenuButton.node.active = true;
          }

          if (this.difficultyLabel) {
            this.difficultyLabel.node.active = true;
            var difficultyNames = ["简单", "中等", "困难"];
            this.difficultyLabel.string = "\u96BE\u5EA6: " + difficultyNames[difficulty];
          }

          this.initializeGame();
        }

        initializeGame() {
          // 初始化游戏板
          this.board.fill(CellState.Empty);
          this.gameState = GameState.Playing;
          this.updateStatusLabel("Your turn"); // 获取所有格子按钮

          this.gridButtons = [];

          for (var i = 0; i < 9; i++) {
            var button = this.gameBoard.children[i].getComponent(Button);
            this.gridButtons.push(button); // 重置按钮为可交互状态

            button.interactable = true; // 更新格子显示

            this.updateCellSprite(i, CellState.Empty);
          }
        }

        setupEventListeners() {
          var _this = this;

          var _loop = function _loop(i) {
            if (_this.gameBoard && _this.gameBoard.children[i]) {
              var button = _this.gameBoard.children[i].getComponent(Button);

              if (button) {
                button.node.on(Button.EventType.CLICK, () => _this.onCellClick(i), _this);
              }
            }
          };

          // 设置格子按钮事件
          for (var i = 0; i < 9; i++) {
            _loop(i);
          } // 设置重置按钮事件


          if (this.resetButton) {
            this.resetButton.node.on(Button.EventType.CLICK, this.resetGame, this);
          } // 设置难度选择按钮事件


          if (this.easyButton) {
            this.easyButton.node.on(Button.EventType.CLICK, () => this.startGame(Difficulty.Easy), this);
          }

          if (this.mediumButton) {
            this.mediumButton.node.on(Button.EventType.CLICK, () => this.startGame(Difficulty.Medium), this);
          }

          if (this.hardButton) {
            this.hardButton.node.on(Button.EventType.CLICK, () => this.startGame(Difficulty.Hard), this);
          } // 设置返回菜单按钮事件


          if (this.backToMenuButton) {
            this.backToMenuButton.node.on(Button.EventType.CLICK, this.showDifficultyMenu, this);
          }
        }

        onCellClick(index) {
          // 检查是否在游戏中
          if (!this.isInGame) {
            return;
          } // 检查游戏状态和格子是否为空


          if (this.gameState !== GameState.Playing || this.board[index] !== CellState.Empty) {
            return;
          } // 玩家下棋


          this.makeMove(index, CellState.Player); // 检查游戏是否结束

          if (this.checkGameEnd()) {
            return;
          } // AI下棋


          this.scheduleOnce(() => {
            this.makeAIMove();
            this.checkGameEnd();
          }, 0.5); // 延迟0.5秒让AI下棋
        }

        makeMove(index, player) {
          this.board[index] = player;
          this.updateCellSprite(index, player);

          if (player === CellState.Player) {
            this.updateStatusLabel("AI Thinking...");
          } else {
            this.updateStatusLabel("Your turn");
          }
        }

        makeAIMove() {
          if (this.gameState !== GameState.Playing) {
            return;
          }

          var bestMove = -1;

          switch (this.currentDifficulty) {
            case Difficulty.Easy:
              bestMove = this.getEasyMove();
              break;

            case Difficulty.Medium:
              bestMove = this.getMediumMove();
              break;

            case Difficulty.Hard:
              bestMove = this.getHardMove();
              break;
          }

          if (bestMove !== -1) {
            this.makeMove(bestMove, CellState.AI);
          }
        } // 简单难度：70%随机，30%聪明


        getEasyMove() {
          var random = Math.random();

          if (random < 0.7) {
            // 70%概率进行随机移动
            return this.getRandomMove();
          } else {
            // 30%概率进行聪明移动（只考虑基本策略）
            return this.getBasicStrategyMove();
          }
        } // 中等难度：40%随机，60%聪明


        getMediumMove() {
          var random = Math.random();

          if (random < 0.4) {
            // 40%概率进行随机移动
            return this.getRandomMove();
          } else {
            // 60%概率进行智能移动（使用简化的策略）
            return this.getMediumStrategyMove();
          }
        } // 困难难度：使用完整的Minimax算法


        getHardMove() {
          var bestScore = -Infinity;
          var bestMove = -1;

          for (var i = 0; i < 9; i++) {
            if (this.board[i] === CellState.Empty) {
              this.board[i] = CellState.AI;
              var score = this.minimax(0, false);
              this.board[i] = CellState.Empty;

              if (score > bestScore) {
                bestScore = score;
                bestMove = i;
              }
            }
          }

          return bestMove;
        } // 随机移动


        getRandomMove() {
          var emptyCells = [];

          for (var i = 0; i < 9; i++) {
            if (this.board[i] === CellState.Empty) {
              emptyCells.push(i);
            }
          }

          if (emptyCells.length > 0) {
            var randomIndex = Math.floor(Math.random() * emptyCells.length);
            return emptyCells[randomIndex];
          }

          return -1;
        } // 基本策略（简单难度使用）


        getBasicStrategyMove() {
          // 1. 如果AI能获胜，立即获胜
          for (var i = 0; i < 9; i++) {
            if (this.board[i] === CellState.Empty) {
              this.board[i] = CellState.AI;

              if (this.getWinner() === CellState.AI) {
                this.board[i] = CellState.Empty;
                return i;
              }

              this.board[i] = CellState.Empty;
            }
          } // 2. 如果玩家要获胜，阻止玩家


          for (var _i = 0; _i < 9; _i++) {
            if (this.board[_i] === CellState.Empty) {
              this.board[_i] = CellState.Player;

              if (this.getWinner() === CellState.Player) {
                this.board[_i] = CellState.Empty;
                return _i;
              }

              this.board[_i] = CellState.Empty;
            }
          } // 3. 否则随机移动


          return this.getRandomMove();
        } // 中等策略


        getMediumStrategyMove() {
          // 1. 如果AI能获胜，立即获胜
          for (var i = 0; i < 9; i++) {
            if (this.board[i] === CellState.Empty) {
              this.board[i] = CellState.AI;

              if (this.getWinner() === CellState.AI) {
                this.board[i] = CellState.Empty;
                return i;
              }

              this.board[i] = CellState.Empty;
            }
          } // 2. 如果玩家要获胜，阻止玩家


          for (var _i2 = 0; _i2 < 9; _i2++) {
            if (this.board[_i2] === CellState.Empty) {
              this.board[_i2] = CellState.Player;

              if (this.getWinner() === CellState.Player) {
                this.board[_i2] = CellState.Empty;
                return _i2;
              }

              this.board[_i2] = CellState.Empty;
            }
          } // 3. 优先选择中心


          if (this.board[4] === CellState.Empty) {
            return 4;
          } // 4. 选择角落


          var corners = [0, 2, 6, 8];
          var emptyCorners = corners.filter(i => this.board[i] === CellState.Empty);

          if (emptyCorners.length > 0) {
            var randomIndex = Math.floor(Math.random() * emptyCorners.length);
            return emptyCorners[randomIndex];
          } // 5. 否则随机移动


          return this.getRandomMove();
        }

        minimax(depth, isMaximizing) {
          var winner = this.getWinner();
          if (winner === CellState.AI) return 10 - depth;
          if (winner === CellState.Player) return depth - 10;
          if (this.isBoardFull()) return 0;

          if (isMaximizing) {
            var bestScore = -Infinity;

            for (var i = 0; i < 9; i++) {
              if (this.board[i] === CellState.Empty) {
                this.board[i] = CellState.AI;
                var score = this.minimax(depth + 1, false);
                this.board[i] = CellState.Empty;
                bestScore = Math.max(score, bestScore);
              }
            }

            return bestScore;
          } else {
            var _bestScore = Infinity;

            for (var _i3 = 0; _i3 < 9; _i3++) {
              if (this.board[_i3] === CellState.Empty) {
                this.board[_i3] = CellState.Player;

                var _score = this.minimax(depth + 1, true);

                this.board[_i3] = CellState.Empty;
                _bestScore = Math.min(_score, _bestScore);
              }
            }

            return _bestScore;
          }
        }

        checkGameEnd() {
          var winner = this.getWinner();

          if (winner === CellState.Player) {
            this.gameState = GameState.PlayerWin;
            this.updateStatusLabel("You win!");
            return true;
          } else if (winner === CellState.AI) {
            this.gameState = GameState.AIWin;
            this.updateStatusLabel("AI Win!");
            return true;
          } else if (this.isBoardFull()) {
            this.gameState = GameState.Draw;
            this.updateStatusLabel("A Draw!");
            return true;
          }

          return false;
        }

        getWinner() {
          for (var combination of this.WINNING_COMBINATIONS) {
            var [a, b, c] = combination;

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
          var button = this.gridButtons[index];
          var buttonComponent = button.getComponent(Button);
          var spriteFrame = null;

          switch (state) {
            case CellState.Player:
              spriteFrame = this.circleSprite;
              break;

            case CellState.AI:
              spriteFrame = this.crossSprite;
              break;

            case CellState.Empty:
            default:
              spriteFrame = this.emptySprite;
              break;
          } // 设置按钮的所有状态都使用相同的图片，避免hover时改变


          buttonComponent.normalSprite = spriteFrame;
          buttonComponent.pressedSprite = spriteFrame;
          buttonComponent.hoverSprite = spriteFrame;
          buttonComponent.disabledSprite = spriteFrame; // 如果格子已被占用，禁用按钮交互但保持视觉效果

          if (state !== CellState.Empty) {
            buttonComponent.interactable = false; // 重新启用视觉效果但禁用点击

            buttonComponent.node.getComponent(Sprite).spriteFrame = spriteFrame;
          } else {
            buttonComponent.interactable = true;
          }
        }

        updateStatusLabel(text) {
          if (this.statusLabel) {
            this.statusLabel.string = text;
          }
        }

        resetGame() {
          if (this.isInGame) {
            this.initializeGame();
          }
        }

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "gameBoard", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "resetButton", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "statusLabel", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "circleSprite", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "crossSprite", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "emptySprite", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "difficultyMenu", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "easyButton", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "mediumButton", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "hardButton", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "backToMenuButton", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "difficultyLabel", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8b42b5790584694f46a7f5f55ebc5f361c8a0ba3.js.map