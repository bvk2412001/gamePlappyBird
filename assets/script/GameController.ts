import { _decorator, Component, director, instantiate, Label, Node, Prefab, Vec3 } from 'cc';
import { BirdController } from './BirdController';
import { RestartUI } from './RestartUI';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {
    @property(Node)
    bird: Node;

    @property(Node)
    gameBackground: Node;

    @property(Node)
    gameUI:Node

    @property(Label)
    scoreLable: Label;

    @property(Node)
    playButton: Node;

    scoreGame: number;

    positionX;

    @property(Prefab)
    ongnuocPrefab: Prefab;

    private arrPipe: Node[] = [];

    @property(Prefab)
    private gameOverPrefab:Prefab | null = null;

    start() {
        this.gameInit();
    }

    update(deltaTime: number) {

    }

    gameInit() {
        this.scoreGame = 0;
        this.scoreLable.string = "" + this.scoreGame;
        this.playButton.on(Node.EventType.TOUCH_START, this.onTouchplayButton, this);
    }

    onTouchplayButton() {
        this.createPipe();
        this.playButton.active = false;
        this.bird.getComponent(BirdController).birdStart();
    }

    trackingBird(birdX: number) {
        this.positionX = birdX;
        if (this.arrPipe[0]) {
            let firstPipe = this.arrPipe[0].position.x;
            let deltaX = birdX - firstPipe;
            if (deltaX > 2000) {
                this.scoreGame += 1;
                this.scoreLable.string = "" + this.scoreGame;
                this.arrPipe[0].setPosition(new Vec3(firstPipe + 4500, 160));
                let currentPipe = this.arrPipe.shift();
                this.arrPipe.push(currentPipe);
            }
        }
    }

    private createPipe() {
        for (let i = 0; i < 3; i++) {
            let ongnuoc = instantiate(this.ongnuocPrefab);
            let x = this.positionX;
            if (i < 3) {
                x = 1000 + 1000 + i * 1500;
            }

            ongnuoc.position = new Vec3(x, 160);
            this.gameBackground.addChild(ongnuoc);
            this.arrPipe.push(ongnuoc);
            console.log("tao")
        }
    }

    restartUI(){
        const showRestartUI = ()=>{
            let restartUI = instantiate(this.gameOverPrefab);
            this.gameUI.addChild(restartUI);
            restartUI.getComponent(RestartUI).init(this.scoreGame,()=>{
                director.loadScene('maingame')
            })
        }
        setTimeout(() => {
            //
            //show restart ui 
            showRestartUI();
            //
        }, 1000);
    }
}


