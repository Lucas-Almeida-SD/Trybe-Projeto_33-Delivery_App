const deliveryAddress = 'Rua São Sebatião';
const sellerName = 'Fulana Pereira';

const sales = [
  {
    id: 1,
    userId: 3,
    sellerId: 2,
    seller: { name: sellerName },
    totalPrice: '14.12',
    deliveryAddress,
    deliveryNumber: '1015',
    saleDate: '2022-09-29T18:32:10.000Z',
    status: 'Pendente',
    products: [
      {
        id: 10,
        name: 'Skol Beats Senses 269ml',
        price: '3.57',
        quantity: 2,
        urlImage: 'http://localhost:3001/images/skol_beats_senses_269ml.jpg',
      },
      {
        id: 11,
        name: 'Stella Artois 275ml',
        price: '3.49',
        quantity: 2,
        urlImage: 'http://localhost:3001/images/stella_artois_275ml.jpg',
      },
    ],
  },
  {
    id: 2,
    userId: 3,
    sellerId: 2,
    seller: { name: sellerName },
    totalPrice: '9.99',
    deliveryAddress,
    deliveryNumber: '1015',
    saleDate: '2022-10-02T17:28:40.000Z',
    status: 'Preparando',
    products: [
      {
        id: 2,
        name: 'Heineken 600ml',
        price: '7.50',
        urlImage: 'http://localhost:3001/images/heineken_600ml.jpg',
        quantity: 1,
      },
      {
        id: 3,
        name: 'Antarctica Pilsen 300ml',
        price: '2.49',
        urlImage: 'http://localhost:3001/images/antarctica_pilsen_300ml.jpg',
        quantity: 1,
      },
    ],
  },
  {
    id: 3,
    userId: 3,
    sellerId: 2,
    seller: { name: sellerName },
    totalPrice: '20.55',
    deliveryAddress,
    deliveryNumber: '1015',
    saleDate: '2022-10-02T17:27:50.000Z',
    status: 'Em Trânsito',
    products: [
      {
        id: 7,
        name: 'Becks 330ml',
        price: '4.99',
        urlImage: 'http://localhost:3001/images/becks_330ml.jpg',
        quantity: 3,
      },
      {
        id: 8,
        name: 'Brahma Duplo Malte 350ml',
        price: '2.79',
        urlImage: 'http://localhost:3001/images/brahma_duplo_malte_350ml.jpg',
        quantity: 2,
      },
    ],
  },
  {
    id: 4,
    userId: 3,
    sellerId: 2,
    seller: { name: sellerName },
    totalPrice: '6.60',
    deliveryAddress,
    deliveryNumber: '1015',
    saleDate: '2022-10-02T17:28:57.000Z',
    status: 'Entregue',
    products: [
      {
        id: 1,
        name: 'Skol Lata 250ml',
        price: '2.20',
        urlImage: 'http://localhost:3001/images/skol_lata_350ml.jpg',
        quantity: 3,
      },
    ],
  },
];

export default sales;
