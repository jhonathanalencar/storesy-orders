import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const discounts = [
  {
    discountId: 'e63d5eaa-dba7-4b5f-a4bd-3297a371a71c',
    percent: 30,
    active: true,
  },
  {
    discountId: '6e27cf34-6c50-4218-986b-2b38da9658d7',
    percent: 5,
    active: true,
  },
  {
    discountId: 'd51427d1-db23-4b85-b853-2f8147bf3de2',
    percent: 15,
    active: true,
  },
  {
    discountId: 'ddaf9614-27fb-4a81-a89b-1b9d3eb99d7c',
    percent: 10,
    active: true,
  },
];

const products = [
  {
    productId: 'ec442cf1-4752-4b3f-99d0-94a615b3e85d',
    name: 'XtremeGamer Pro Gaming Chair',
    description:
      'Immerse yourself in comfort and style with the XtremeGamer Pro Gaming Chair. Designed for gamers, this ergonomic chair offers adjustable armrests, lumbar support, and a reclining feature for personalized comfort during long gaming sessions. With its sleek design and sturdy construction, the XtremeGamer chair provides the ultimate gaming experience. Elevate your gaming setup and take your gaming to the next level with the XtremeGamer Pro Gaming Chair.',
    price: 249.99,
    imageUrl:
      'https://images.unsplash.com/photo-1612011213721-3936d387f318?q=80&w=2138&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: 'd51427d1-db23-4b85-b853-2f8147bf3de2',
  },
  {
    productId: '1c8d5f5b-2df6-4f4a-bcee-8fb79e5db1bb',
    name: 'EliteGamer Ultimate Gaming Headset',
    description:
      'Immerse yourself in the world of gaming with the EliteGamer Ultimate Gaming Headset. Engineered for uncompromised audio performance, this headset delivers immersive sound quality, allowing you to hear every detail with precision. Featuring noise-canceling microphone technology and plush ear cushions, the EliteGamer headset provides unparalleled comfort and crystal-clear communication during intense gaming sessions. Elevate your gaming experience and dominate the competition with the EliteGamer Ultimate Gaming Headset.',
    price: 79.99,
    imageUrl:
      'https://images.unsplash.com/photo-1591105866700-cb5d708ccd93?q=80&w=2107&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: 'ddaf9614-27fb-4a81-a89b-1b9d3eb99d7c',
  },
  {
    productId: '953960a8-a883-42ce-a6ce-2f49f3024cf3',
    name: 'TechPro Plus Wireless Charging Station',
    description:
      'Unleash the future of charging with the TechPro Plus Wireless Charging Station. This cutting-edge device combines sleek design with high-tech functionality, offering fast and efficient wireless charging for your essential gadgets. With multiple charging pads and universal compatibility, its a versatile solution for your smartphone, smartwatch, and earbuds. Elevate your charging experience and declutter your space with the TechPro Plus Wireless Charging Station — where innovation meets convenience. Act fast, as only 150 units are available!',
    price: 79.99,
    imageUrl:
      'https://images.unsplash.com/photo-1615526675250-dbe5d4302ae0?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: null,
  },
  {
    productId: '8430e28d-d1b0-4940-9147-269462d20d61',
    name: 'TranquilEase Aromatherapy Diffuser',
    description:
      'Create a serene ambiance in your home with the TranquilEase Aromatherapy Diffuser. This elegant diffuser gently disperses your favorite essential oils into the air, filling your space with soothing fragrances that promote relaxation and well-being. With its sleek design and whisper-quiet operation, the TranquilEase diffuser is perfect for bedrooms, living rooms, and offices. Transform your environment into an oasis of calm with the TranquilEase Aromatherapy Diffuser.',
    price: 34.99,
    imageUrl:
      'https://images.unsplash.com/photo-1537035448858-6d703dbc320f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: 'ddaf9614-27fb-4a81-a89b-1b9d3eb99d7c',
  },
  {
    productId: '7ddfb3ef-ec05-4f8c-8097-6d460deaf853',
    name: 'HarmonyPod Wireless Earbuds',
    description:
      'Immerse yourself in unparalleled audio bliss with HarmonyPod Wireless Earbuds. These sleek and compact earbuds deliver crystal-clear sound and deep bass, providing an immersive listening experience. With touch controls, a secure fit, and long-lasting battery life, HarmonyPod is the perfect companion for music lovers on the go. Elevate your auditory journey and embrace the harmony of superior sound quality with HarmonyPod Wireless Earbuds.',
    price: 69.99,
    imageUrl:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: 'e63d5eaa-dba7-4b5f-a4bd-3297a371a71c',
  },
  {
    productId: '069c0ce9-d8ee-400e-ab16-604302e6f3dd',
    name: 'HarmonyHue Himalayan Salt Lamp',
    description:
      'Illuminate your space with the soothing glow of the HarmonyHue Himalayan Salt Lamp. Mined from ancient Himalayan salt deposits, this lamp emits a warm, amber light that creates a calming ambiance. Known for its air-purifying properties, the salt lamp helps to neutralize electromagnetic radiation and improve air quality. Add a touch of tranquility to any room with the HarmonyHue Himalayan Salt Lamp.',
    price: 29.99,
    imageUrl:
      'https://images.unsplash.com/photo-1623241923490-5b2fd532828f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: 'd51427d1-db23-4b85-b853-2f8147bf3de2',
  },
  {
    productId: 'f2d3c435-dcbe-4901-849a-0c8ce4902391',
    name: 'BioHarmony Plant-Based Protein Powder',
    description:
      'Fuel your body with the goodness of BioHarmony Plant-Based Protein Powder. This nutritional powerhouse combines premium plant proteins for a delicious and complete source of essential amino acids. Perfect for post-workout recovery or as a daily supplement, BioHarmony supports your active lifestyle. With only 250 units available, grab your stash of this delectable protein powder and embrace the harmony of nourishing your body naturally.',
    price: 39.99,
    imageUrl:
      'https://images.unsplash.com/photo-1622485831129-b820c2891f4e?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: null,
  },
  {
    productId: 'fafaf90e-b6c3-4920-a06d-cad01a68b3ed',
    name: 'HyperStrike Gaming Keyboard',
    description:
      'Unleash your gaming potential with the HyperStrike Gaming Keyboard. Engineered for gamers, this mechanical keyboard boasts ultra-responsive keys and customizable RGB backlighting for an immersive gaming experience. With its durable construction and ergonomic design, the HyperStrike keyboard provides comfort and precision during intense gaming sessions. Elevate your gameplay and dominate the competition with the HyperStrike Gaming Keyboard.',
    price: 79.99,
    imageUrl:
      'https://images.unsplash.com/photo-1697022976768-2fd7f4e4c399?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: 'ddaf9614-27fb-4a81-a89b-1b9d3eb99d7c',
  },
  {
    productId: '8d3d32e7-f8a6-4623-a8a4-15fce9cdbf41',
    name: 'SereneSound Noise-Canceling Headphones',
    description:
      'Immerse yourself in a world of tranquility with the SereneSound Noise-Canceling Headphones. Designed for supreme comfort and exceptional sound quality, these headphones transport you to a realm of pure audio bliss. With advanced noise-canceling technology, you can escape the hustle and bustle of the world around you. Limited to just 100 units, the SereneSound headphones redefine your listening experience. Elevate your auditory journey and secure your pair now for a serene escape into music like never before.',
    price: 129.99,
    imageUrl:
      'https://images.unsplash.com/photo-1599669454699-248893623440?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: null,
  },
  {
    productId: 'a6781dd8-d185-43bb-a323-b6c6c310ae3b',
    name: 'EcoBlend Organic Tea Sampler',
    description:
      'Savor the finest organic teas with our EcoBlend Organic Tea Sampler. This exquisite set features a curated selection of premium, sustainably sourced teas that promise a journey of flavors. From soothing chamomile to robust black tea, each blend is carefully chosen to elevate your tea-drinking experience. Limited to 300 sets, embrace the art of tea with the EcoBlend Organic Tea Sampler and treat your senses to a symphony of natural and delightful aromas.',
    price: 29.99,
    imageUrl:
      'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: null,
  },
  {
    productId: 'cabce1b7-88c9-411d-855d-02ec41c19b3f',
    name: 'GloFit Smart Fitness Tracker',
    description:
      'Revolutionize your fitness journey with the GloFit Smart Fitness Tracker. Packed with advanced features, this sleek wearable is your personal health companion. Track your steps, monitor heart rate, analyze sleep patterns, and receive real-time notifications seamlessly. With a vibrant touch display and water-resistant design, the GloFit ensures you stay connected and motivated throughout your day. Elevate your fitness experience and embrace a healthier, more informed lifestyle with the GloFit Smart Fitness Tracker.',
    price: 79.99,
    imageUrl:
      'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: null,
  },
  {
    productId: '39f2eb31-9f69-45f8-98f0-fc96b10b86f0',
    name: 'ApexBoost Gaming Keyboard',
    description:
      'Experience unparalleled gaming performance with the ApexBoost Gaming Keyboard. Engineered with precision and durability in mind, this mechanical keyboard offers lightning-fast response times and customizable RGB lighting for a fully immersive gaming experience. With programmable macro keys and anti-ghosting technology, the ApexBoost keyboard gives you the competitive edge you need to dominate every game. Elevate your gaming setup and take your skills to the next level with the ApexBoost Gaming Keyboard.',
    price: 69.99,
    imageUrl:
      'https://images.unsplash.com/photo-1637243218672-d338945efdf7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: 'd51427d1-db23-4b85-b853-2f8147bf3de2',
  },
  {
    productId: '6abe914d-31ae-4a77-b2da-c1333402aaa0',
    name: 'EcoFresh Bamboo Toothbrush Set',
    description:
      'Make your daily routine eco-friendly with the EcoFresh Bamboo Toothbrush Set. Crafted from sustainably sourced bamboo, these toothbrushes offer a stylish and environmentally conscious alternative to traditional plastic brushes. The set includes four brushes with charcoal-infused bristles for a refreshing clean. Upgrade your oral care routine while contributing to a greener planet with the EcoFresh Bamboo Toothbrush Set.',
    price: 14.99,
    imageUrl:
      'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: '6e27cf34-6c50-4218-986b-2b38da9658d7',
  },
  {
    productId: 'd4981d56-a08f-4d7c-b9f1-7a4a2029c3d5',
    name: 'HyperCharge Gaming Controller',
    description:
      'Experience unparalleled precision and performance with the HyperCharge Gaming Controller. Engineered for gamers by gamers, this controller offers lightning-fast response times, customizable buttons, and ergonomic design for maximum comfort during extended gaming sessions. With its plug-and-play compatibility and wireless connectivity, the HyperCharge controller is your ultimate gaming companion. Elevate your gameplay and dominate the competition with the HyperCharge Gaming Controller.',
    price: 69.99,
    imageUrl:
      'https://images.unsplash.com/photo-1585857188823-77658a70979a?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: null,
  },
  {
    productId: '8514a728-2a5d-4713-988e-d19ff23e91aa',
    name: 'GamerX Pro Gaming Mouse',
    description:
      'Dominate your gaming competition with the GamerX Pro Gaming Mouse. Engineered for precision and performance, this ergonomic mouse features customizable DPI settings, programmable buttons, and ultra-responsive tracking technology. Whether youre engaging in fast-paced FPS battles or executing intricate strategy games, the GamerX Pro ensures smooth and accurate gameplay. Elevate your gaming experience and unleash your full potential with the GamerX Pro Gaming Mouse.',
    price: 49.99,
    imageUrl:
      'https://images.unsplash.com/photo-1623820919239-0d0ff10797a1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: 'd51427d1-db23-4b85-b853-2f8147bf3de2',
  },
  {
    productId: '33c5c9a5-058a-45c8-a1b7-9ac920c41ada',
    name: 'XtremeGrip Gaming Controller',
    description:
      'Get ready to level up your gaming experience with the XtremeGrip Gaming Controller. Engineered for precision and comfort, this controller offers responsive buttons and ergonomic design, ensuring optimal performance during intense gaming sessions. With its plug-and-play functionality and compatibility with various gaming platforms, the XtremeGrip controller is your ultimate gaming companion. Elevate your gameplay and conquer the competition with the XtremeGrip Gaming Controller.',
    price: 39.99,
    imageUrl:
      'https://images.unsplash.com/photo-1605835963874-a7c87f56259e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: 'ddaf9614-27fb-4a81-a89b-1b9d3eb99d7c',
  },
  {
    productId: '97abc2eb-5f84-4f7d-b516-9cce4ea0bf9b',
    name: 'TranquilRain Shower Head',
    description:
      'Upgrade your shower experience with the TranquilRain Shower Head. Crafted with precision engineering, this luxurious shower head features multiple settings for a personalized and rejuvenating shower experience. From gentle rainfall to invigorating massage, TranquilRain offers unparalleled relaxation and comfort. Transform your daily routine into a spa-like retreat with TranquilRain Shower Head.',
    price: 59.99,
    imageUrl:
      'https://images.unsplash.com/photo-1576678433413-202829a1ab98?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: 'd51427d1-db23-4b85-b853-2f8147bf3de2',
  },
  {
    productId: '22bdfc97-294d-49e8-bda4-bff12fa9ccfb',
    name: 'VortexEdge Gaming Mouse',
    description:
      'Experience precision gaming with the VortexEdge Gaming Mouse. Engineered for speed and accuracy, this ergonomic mouse features customizable DPI settings and programmable buttons for a personalized gaming experience. With its sleek design and responsive tracking, the VortexEdge mouse ensures smooth and precise cursor control in any gaming situation. Elevate your gameplay and conquer your opponents with the VortexEdge Gaming Mouse.',
    price: 49.99,
    imageUrl:
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    discountId: 'e63d5eaa-dba7-4b5f-a4bd-3297a371a71c',
  },
];

async function run() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.discount.deleteMany();

  await prisma.discount.createMany({
    data: discounts,
  });
  await prisma.product.createMany({
    data: products,
  });
}

run()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
