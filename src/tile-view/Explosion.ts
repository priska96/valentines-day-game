import Konva from "konva";
import Context = Konva.Context;
import {MAP_DIMENSIONS} from "./mapImgs";

const {COLS, ROWS} = MAP_DIMENSIONS;
const CANVAS_WIDTH= COLS*32
const CANVAS_HEIGHT = ROWS*32

const MIN = 0;
const MAX = CANVAS_WIDTH;

function clamp(number:number, min = MIN, max = MAX) : number {
    return Math.max(min, Math.min(number, max));
}
function random(factor: number) :number {
    return clamp(Math.floor(Math.random() * factor));
}
export class Satellite {
    ctx: Context|null = null
    x = 0;
    y = 0;
    size = 0;
    r = 0;
    deg:number|undefined = 0;
    bgColor = "";

    constructor(ctx: Context , deg?:number) {
        this.ctx = ctx;
        this.deg = deg;
        this.reset();
        // this.deg = clamp(Math.floor(Math.random() * 360));
    }

    draw() {
        if(!this.ctx) return;
        this.ctx.beginPath();
        this.ctx.fillStyle = this.bgColor;
        this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
        this.ctx.fill();
        this.ctx.closePath();
    }

    reset() {
        this.x = CANVAS_WIDTH / 2;
        this.y = CANVAS_HEIGHT / 2;
        this.size = random(8);
        this.r = random(100);
        this.bgColor = this.randomColor;
    }

    get randomColor() {
        const r = random(255);
        const g = random(255);
        const b = random(255);
        const rgba = `rgba(${r},${g},${b}, 1)`;
        return rgba;
    }
}

// All the properties for Ring
export class Ring {
    ctx: Context|null = null
    x = 0;
    y = 0;
    radius = 0;
    color = "";
    velocity = 0;

    constructor(ctx: Context , deg?:number) {
        this.ctx = ctx;
        this.reset();
    }

    draw() {
        if(!this.ctx) return;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.closePath();
    }

    reset() {
        this.x = 0;
        this.y = 0;
        this.radius = 0;
        this.color = "#ffffffaa";
        this.velocity = 2;
    }
}