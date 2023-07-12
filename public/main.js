// Links for ui elemments
const $el = {
  ul: document.querySelector('ul#myRandomList'),
  tmpl: document.querySelector('#tmpl'),
  search: document.querySelector('input[type=search]'),
  generateMoreBtn: document.querySelector('button#moreItems'),
  recordFound: document.querySelector('#listStatus code:first-child'),
  recordCount: document.querySelector('#listStatus code:last-child'),
};

// Declare variables
const list = [];
const elems = [];
const [tmpl] = $el.tmpl.content.cloneNode(true).children;

// Declare functions
const generateMsg = (msg, index) => {
  const now = new Date();
  const date = now.toLocaleString('uk').replace(',', '\t');
  const ms = now.getMilliseconds();
  const micro = Math.floor(window.performance.now());
  const text = `${msg}\t${index}\t${date}.${ms}.${micro}`;
  return text;
}

const hightLigntText = (index, search, text) => {
  const part1 = text.substr(0, index);
  const part2 = text.substr(index, search.length);
  const part3 = text.substr(index + search.length);
  return `${part1}<em>${part2}</em>${part3}`;
}

const generateItems = (count = 20) => {
  const newList = [];
  const newElems = [];
  const start = list.length;
  for (let index = start; index < start + count; index++) {
    const elm = tmpl.cloneNode(true);
    const text = generateMsg(`Log_${index + 1}`, index);
    elm.innerText = text;
    newList.push(text);
    newElems.push(elm);
  }
  $el.ul.append(...newElems);
  list.push(...newList);
  elems.push(...newElems);
  $el.recordCount.innerText = `${list.length}`;
}

// Run main logic
generateItems();

// listeners
$el.search.onkeyup = () => {
  const search = $el.search.value.toLowerCase();
  let found = 0;
  for (const [index, elText] of list.entries()) {
    const findIndex = elText.toLowerCase().indexOf(search);

    if (findIndex !== -1) {
      found++;
      elems[index].classList.remove('hide');
      elems[index].innerHTML = hightLigntText(findIndex, search, list[index]);
    } else {
      elems[index].innerHTML = list[index];
      elems[index].classList.add('hide');
    }
  }
  const method = found ? 'remove' : 'add'; 
  $el.ul.classList[method]('isEmpty');
  $el.recordFound.innerText = `${found}`;
}
$el.search.onsearch = () => { $el.search.onkeyup() }

$el.generateMoreBtn.onclick = () => {
  generateItems();
  $el.search.onkeyup();
}
