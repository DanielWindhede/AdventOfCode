import * as fs from 'fs';

interface Day {
    date: number;
    functions: ((args: string[]) => void)[];
}

const INPUT_PATH = 'inputs/';
const map = new Array<Day>();

main();

function main(): void {
    map.push({ date: 1, functions: [day1a, day1b] });
    map.push({ date: 2, functions: [day2a, day2b] });
    map.push({ date: 2, functions: [day3a] });

    solveForDay(3);
    // solveAll();
}

function solveForDay(day: number) {
    if (day > 0 && day <= map.length) {
        const path = INPUT_PATH + `day${day}.txt`;
        console.log(`<Reading input from ${path}>`);

        const textContent = fs.readFileSync(path).toString().split("\n");

        for (let i = 0; i < map[day - 1].functions.length; i++) {
            map[day - 1].functions[i](textContent);
        }
    }
}

function solveAll() {
    const DAYS = 32;

    console.log('Solving');

    for (let i = 1; i < DAYS; i++) {
        solveForDay(i);
    }

    console.log('Done');
}

function day1a(textContent: string[]): void {
    let counter = 0;
    for (let i = 1; i < textContent.length; i++) {
        if (+textContent[i - 1] < +textContent[i]) {
            counter++;
        }
    }
    console.log('1a: ' + counter);
}

function day1b(textContent: string[]): void {
    const arr: number[] = new Array();

    for (let i = 0; i < textContent.length; i++) {
        const number: number = +textContent[i];
        for (let j = i; j >= (i - 2); j--) {
            if (arr[j] && j >= 0) {
                arr[j] += number;
            }
        }
        arr.push(number);
    }

    let counter = 0;
    for (let i = 1; i < arr.length; i++) {
        if (arr[i - 1] < arr[i]) {
            counter++;
        }
    }
    console.log('1b: ' + counter);
}

function day2a(textContent: string[]): void {
    let horizontalPos = 0;
    let depth = 0;

    for (let i = 0; i < textContent.length; i++) {
        const str = textContent[i].split(' ');
        const command = str[0];
        const amount = +str[1];
        
        switch(command){
            case 'forward':
                horizontalPos += amount;
                break;
            case 'down':
                depth += amount;
            break;
            case 'up':
                depth -= amount;
                break;
            default:
                break;
        }
    }
    console.log('2a: ' + (horizontalPos * depth));
}

function day2b(textContent: string[]): void {
    let horizontalPos = 0;
    let depth = 0;
    let aim = 0;

    for (let i = 0; i < textContent.length; i++) {
        const str = textContent[i].split(' ');
        const command = str[0];
        const amount = +str[1];
        
        switch(command){
            case 'forward':
                horizontalPos += amount;
                depth += aim * amount;
                break;
            case 'down':
                aim += amount;
            break;
            case 'up':
                aim -= amount;
                break;
            default:
                break;
        }
    }
    console.log('2b: ' + (horizontalPos * depth));
}

function day3a(textContent: string[]): void {
    const totalCount = textContent.length;
    const count: number[] = new Array();

    for (let i = 0; i < textContent.length; i++) {
        const num = textContent[i];
        for (let j = 0; j < num.length; j++) {
            if (j > count.length - 1) {
                count.push(0);
            }

            count[j] += num[j] === '0' ? -1 : 1;
        }
    }

    let str = '';
    for (let i = 0; i < count.length; i++) {
        console.log(count[i]);
        if (count[i] > 0) {
            str += 1;
        }
        else {
            str += 0;
        }
    }

    const gamma = parseInt(str, 2);
    const t = (gamma ^ 1);
    console.log((t >>> 0).toString(2));
    const epsylon = (~(gamma & 0)) ^ gamma;
    // console.log((epsylon >>> 0).toString(2), (gamma >>> 0).toString(2));
    console.log('3a: ' + epsylon * gamma);
}