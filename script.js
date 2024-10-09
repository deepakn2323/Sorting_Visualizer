let array = [];
let sorting = false;
let sortSpeed = 100;
const STATUS_MESSAGE = document.getElementById('status-message');

function generateArray() {
    if (sorting) return;
    disableControls();
    updateStatus('Generating new array...');
    array = [];
    const arrayContainer = document.getElementById('array-container');
    arrayContainer.innerHTML = '';

    const arrayLength = 15;

    for (let i = 0; i < arrayLength; i++) {
        const value = Math.floor(Math.random() * 50) + 1;
        array.push(value);
        
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 8}px`;
        bar.innerHTML = `<span>${value}</span>`;
        
        arrayContainer.appendChild(bar);
    }
    updateStatus('Array generated!');
    enableControls();
}

function setSpeed(speed) {
    sortSpeed = speed; 
    updateStatus(`Sort speed set to ${speed} ms`);
}

function swap(bars, i, j) {
    return new Promise(resolve => {
        const tempHeight = bars[i].style.height;
        bars[i].style.height = bars[j].style.height;
        bars[j].style.height = tempHeight;

        const tempValue = bars[i].innerHTML;
        bars[i].innerHTML = bars[j].innerHTML;
        bars[j].innerHTML = tempValue;

        setTimeout(() => {
            resolve();
        }, sortSpeed);
    });
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function updateStatus(message) {
    STATUS_MESSAGE.innerText = message;
}

function disableControls() {
    document.querySelectorAll('.navbar button, .left-controls button, #speed-range').forEach(element => {
        element.disabled = true;
    });
}

function enableControls() {
    document.querySelectorAll('.navbar button, .left-controls button, #speed-range').forEach(element => {
        element.disabled = false;
    });
}

async function bubbleSort() {
    if (sorting) return;
    sorting = true;
    disableControls();
    updateStatus('Sorting with Bubble Sort...');
    const bars = document.getElementsByClassName('bar');
    
    for (let i = 0; i < array.length && sorting; i++) {
        for (let j = 0; j < array.length - i - 1 && sorting; j++) {
            for (let k = 0; k < array.length - i; k++) {
                bars[k].style.backgroundColor = 'black';
            }

            bars[j].style.backgroundColor = 'orange';
            bars[j + 1].style.backgroundColor = 'red';

            if (array[j] > array[j + 1]) {
                await swap(bars, j, j + 1);
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }

            await delay(sortSpeed);
        }

        bars[array.length - i - 1].style.backgroundColor = 'green';
    }

    for (let i = 0; i < array.length; i++) {
        bars[i].style.backgroundColor = 'green';
    }
    updateStatus('Bubble Sort completed!');
    sorting = false;
    enableControls();
}

// Selection Sort
async function selectionSort() {
    if (sorting) return;
    sorting = true;
    disableControls();
    updateStatus('Sorting with Selection Sort...');
    const bars = document.getElementsByClassName('bar');

    for (let i = 0; i < array.length && sorting; i++) {
        let minIndex = i;

        bars[i].style.backgroundColor = 'blue'; 

        bars[minIndex].style.backgroundColor = 'orange'; 

        for (let j = i + 1; j < array.length && sorting; j++) {
            bars[j].style.backgroundColor = 'red'; 

            if (array[j] < array[minIndex]) {
                bars[minIndex].style.backgroundColor = 'black';
                bars[i].style.backgroundColor = 'blue'; 

                minIndex = j; 
                bars[minIndex].style.backgroundColor = 'orange';
            }

            await delay(sortSpeed);

            if (j !== minIndex) {
                bars[j].style.backgroundColor = 'black';
            }
        }

        if (minIndex !== i) {
            await swap(bars, i, minIndex);
            [array[i], array[minIndex]] = [array[minIndex], array[i]];
        }

        bars[i].style.backgroundColor = 'green'; 

        if (minIndex !== i) {
            bars[minIndex].style.backgroundColor = 'black';
        }
    }
    updateStatus('Selection Sort completed!');
    sorting = false;
    enableControls();
}

// Insertion Sort
async function insertionSort() {
    if (sorting) return;
    sorting = true;
    disableControls();
    updateStatus('Sorting with Insertion Sort...');
    const bars = document.getElementsByClassName('bar');

    for (let i = 1; i < array.length && sorting; i++) {
        let key = array[i];
        let j = i - 1;

        bars[i].style.backgroundColor = 'orange'; 

        while (j >= 0 && array[j] > key && sorting) {
            bars[j].style.backgroundColor = 'orange'; 
            await swap(bars, j + 1, j); 
            bars[j].style.backgroundColor = 'green'; 
            array[j + 1] = array[j];
            j--;
        }

        array[j + 1] = key; 
        await delay(sortSpeed); 

        bars[j + 1].style.backgroundColor = 'green'; 
        
        for (let k = 0; k < i; k++) {
            bars[k].style.backgroundColor = 'green'; 
        }
        
        bars[i].style.backgroundColor = 'green';
    }

    updateStatus('Insertion Sort completed!');
    sorting = false;
    enableControls();
}

window.onload = generateArray;
