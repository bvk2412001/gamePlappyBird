import { _decorator, Component, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RestartUI')
export class RestartUI extends Component {
    @property(Node)
    buttonRestart:Node;

    @property(Label)
    scoreLabel:Label;

    callbackController;

    start() {
        this.buttonRestart.on(Node.EventType.TOUCH_START, this.onTouchStart, this);
    }

    init(score, callbackController){
        this.scoreLabel.string = score;
        this.callbackController = callbackController;
    }

    onTouchStart(){
        this.node.destroy();
        this.callbackController();
    }
    update(deltaTime: number) {
        
    }
}


