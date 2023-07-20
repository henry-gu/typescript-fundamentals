import { productsURL } from '../lib';

const prefix = '🐉 ';

type ProductType = {
    id: number;
    name: string;
    icon?: string;
  };


export default async function updateOutput(id: string = 'output') {
  const products = await getProducts();
  const output = document.querySelector(`#${id}`);
  const html = layoutProducts(products);
  if (output && html) {
    output.innerHTML = html;
  }
}

async function getProducts(): Promise<ProductType[]> {
  const response: Response = await fetch(productsURL);
  const products: ProductType[] = await response.json();
  return products;
}

function layoutProducts(products: ProductType[]) {
  const items = products.map(({ id, name, icon }) => {
    const productHtml = `
      <span class="card-id">#${id}</span>
        <i class="card-icon ${icon} fa-lg"></i>
      <span class="card-name">${name}</span>
      `;
    const cardHtml = `
      <li>
          <div class="card">
              <div class="card-content">
                  <div class="content">
                  ${productHtml}
                  </div>
              </div>
          </div>
      </li>
      `;
    return cardHtml;
  });
  let productsHtml = `<ul>${items.join('')}</ul>`;
  return productsHtml;
}

runTheLearningSamples();

function runTheLearningSamples() {
  ////////////////////////////////////////////////
  //hoisted
  function displayProductInfo(id: number, name: string) {
    console.log(`${prefix} typed paramters`);
    console.log(`product id = ${id} and name = ${name}`);
  }
  displayProductInfo(10, 'Pizza');
  displayProductInfo(10, 'Pizza John');

  ////////////////////////////////////////////////
  console.log(`${prefix} function declaration`);
  console.log(addNumberDeclaration(9, 10));
  function addNumberDeclaration(x: number, y: number) {
    const sum: number = x + y;
    return sum;
  }

  ////////////////////////////////////////////////
  const addNumbersExpression = function (x: number, y: number) {
    const sum: number = x + y;
    return sum;
  };
  console.log(`${prefix} function expression`);
  console.log(addNumberDeclaration(90, 100));

  ////////////////////////////////////////////////
  const sampleProducts = [
    { id: 10, name: 'pizza slice', icon: 'fas fa-pizza-slice' },
    { id: 20, name: 'ice cream', icon: 'fas fa-ice-cream' },
    { id: 30, name: 'chesse', icon: 'fas fa-cheese' },
  ];

  ////////////////////////////////////////////////
  function getProductName(): string[] {
    return sampleProducts.map((p) => p.name);
  }

  console.log(`${prefix} return array`);
  console.log(getProductName());

  ////////////////////////////////////////////////
  function getProductById(id: number): ProductType | undefined {
    return sampleProducts.find((p) => id === p.id);
  }
  console.log(`${prefix} return ProductType`);
  console.log(getProductById(10));

  ////////////////////////////////////////////////
  function displayProducts(products: ProductType[]): void {
    // return type is void
    const productNames = products.map((p) => {
      const name = p.name.toLowerCase();
      return name;
    });
    const msg = `Sample products include ${productNames.join(', ')}`;
    console.log(`${prefix} return void`);
    console.log(msg);
  }

  displayProducts(sampleProducts);
  ////////////////////////////////////////////////
}
