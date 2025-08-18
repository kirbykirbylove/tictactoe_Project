// Cell.ts
import { _decorator, Component, Button, Sprite, SpriteFrame, EventHandler } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Cell')
export class Cell extends Component {
    @property(Sprite)
    public sprite: Sprite = null!;           // 顯示圈/叉

    @property(Button)
    public button: Button = null!;           // 點擊用 Button（可放在子節點）

    /** 由 GameManager 指派 */
    public index = 0;
    /** 由 GameManager 指派 */
    public gameManager: { handleCellClick: (i: number) => void } | null = null;

    /** '', 'O', 'X' */
    private mark: '' | 'O' | 'X' = '';

    onLoad() {
        // 保險：若用 clickEvents 綁定，先清空舊的
        if (this.button) this.button.clickEvents.length = 0;
    }

    /** 由 GameManager 在重置/建立時呼叫 */
    public init(index: number, mgr: any) {
        this.index = index;
        this.gameManager = mgr;
        this.mark = '';
        if (this.sprite) this.sprite.spriteFrame = null;
        if (this.button) {
            this.button.interactable = true;

            // 使用 Button & EventHandler（自訂參數：index）
            this.button.clickEvents.length = 0;
            const handler = new EventHandler();
            handler.target = this.node;            // 事件接收節點
            handler.component = 'Cell';            // 本腳本類名
            handler.handler = 'onClick';           // 回呼
            handler.customEventData = String(index);
            this.button.clickEvents.push(handler);
        }
    }

    /** 由 GameManager 設置圖樣並鎖定互動 */
    public setMark(mark: 'O' | 'X', sf: SpriteFrame) {
        this.mark = mark;
        if (this.sprite) this.sprite.spriteFrame = sf;
        if (this.button) this.button.interactable = false;
    }

    /** GameManager 控制是否允許玩家在自己回合點擊空格 */
    public setInteractable(yes: boolean) {
        if (this.button && this.mark === '') this.button.interactable = yes;
    }

    /** Button 的事件回呼（以 handler + customEventData 方式觸發） */
    public onClick(_evt?: any, customData?: string) {
        if (!this.gameManager) return;
        if (this.mark !== '') return; // 已下過
        const i = customData != null ? parseInt(customData) : this.index;
        this.gameManager.handleCellClick(i);
    }
}
