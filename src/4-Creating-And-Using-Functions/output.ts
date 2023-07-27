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

  // no arrow function declaration
  function getProductById2(id: number): ProductType | undefined {
    return sampleProducts.find(function (p) {
      return id == p.id;
    });
  }

  // one line arrow function definition
  const getProductById3 = (id: number): ProductType | undefined =>
    sampleProducts.find((p) => id === p.id);

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

  const getRandomInt = (max: number = 1000) => Math.floor(Math.random() * max);

  function createProduct(name: string, icon?: string): ProductType {
    const id = getRandomInt(1000);
    return {
      id,
      name,
      icon,
    };
  }

  console.log(`${prefix} Optional parameters`);
  let pineapple = createProduct('pineapple', 'pine-apple.jpg');
  let mango = createProduct('mango');
  console.log(pineapple, mango);

  function createProductDefault(
    name: string,
    icon: string = 'generic-fruit.jpg',
  ): ProductType {
    const id = getRandomInt();
    return {
      id,
      name,
      icon,
    };
  }

  console.log(`${prefix} Default parameters`);
  let pineapple2 = createProductDefault('pineapple', 'pine-apple.jpg');
  let mango2 = createProductDefault('mango');
  console.log(pineapple2, mango2);

  function buildAddress(
    street: string,
    city: string,
    ...restOfAddress: string[]
  ) {
    console.table(restOfAddress);
    const address = `${street} ${city} ${restOfAddress.join(', ')}`;
    return address;
  }

  const someAddress = buildAddress(
    '1 lois lane',
    'smallville',
    'apt 101', // rest
    'area 51', // rest
    'mystery country', // rest
  );

  console.log(`${prefix} Rest parameters`);
  console.log(someAddress);

  
  function displayProduct({ id, name }: ProductType): void {
    console.log(`${prefix} Destructuring parameters`);
    console.log(`Product id=${id} and name=${name}`);
  }

  const prod = getProductById(10);
  if (prod) {
    displayProduct(prod);
  }


}
