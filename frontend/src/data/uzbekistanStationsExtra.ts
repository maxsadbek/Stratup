import { azs } from './stationSeedHelper';
// StationSeed type lives in stationSeedHelper.ts (circular import oldini olish)

/** Qo'shimcha AZS — yangi mahallalar, tuman markazlari, kichik shaharlar */
export const uzbekistanStationsExtra = [
  // —— Toshkent shahri (tumanlar / yangi hududlar) ——
  azs('uz-tash-9', 'Lukoil Uchtepa', 'Lukoil', 'Toshkent', 'Toshkent', 'Uchtepa tumani, Qoratepa', 41.292, 69.152, 30),
  azs('uz-tash-10', 'GazOil Bektemir', 'GazOil', 'Toshkent', 'Toshkent', 'Bektemir tumani', 41.204, 69.334, 20),
  azs('uz-tash-11', 'UzPetrol Shayxontohur', 'UzPetrol', 'Toshkent', 'Toshkent', 'Shayxontohur, Labzak', 41.318, 69.241, 40),
  azs('uz-tash-12', 'Shell Mirobod', 'Shell', 'Toshkent', 'Toshkent', 'Mirobod tumani', 41.305, 69.315, 50),
  azs('uz-tash-13', 'Neftchi Yangihayot', 'Neftchi', 'Toshkent', 'Toshkent', 'Yangihayot tumani', 41.198, 69.178, 10),
  azs('uz-tash-14', 'Turon Qibray yo\'li', 'Turon', 'Toshkent', 'Toshkent', 'Qibray yo\'li, yangi mahalla', 41.365, 69.412, 25),
  azs('uz-tash-15', 'EcoFuel Yashnobod', 'EcoFuel', 'Toshkent', 'Toshkent', 'Yashnobod, Maxtumquli', 41.268, 69.332, 35),
  azs('uz-tash-16', 'Petroline Hamza', 'Petroline', 'Toshkent', 'Toshkent', 'Hamza tumani', 41.278, 69.252, 15),

  // —— Toshkent viloyati ——
  azs('uz-tov-6', 'Nurafshon City Oil', 'UzPetrol', 'Nurafshon', 'Toshkent viloyati', 'Mustaqillik ko\'chasi', 41.042, 69.361, 5),
  azs('uz-tov-7', 'Zangiota Fuel', 'Lukoil', 'Zangiota', 'Toshkent viloyati', 'Toshkent halqa yo\'li', 41.198, 69.142, 0),
  azs('uz-tov-8', 'Qibray Neft', 'GazOil', 'Qibray', 'Toshkent viloyati', 'Markaziy ko\'cha', 41.389, 69.465, 10),
  azs('uz-tov-9', 'Parkent Oil', 'Neftchi', 'Parkent', 'Toshkent viloyati', 'Samarqand yo\'li', 41.051, 69.676, 15),
  azs('uz-tov-10', 'Piskent AZS', 'UzPetrol', 'Piskent', 'Toshkent viloyati', 'Markaz ko\'chasi', 40.898, 68.72, 20),
  azs('uz-tov-11', 'Bo\'ka Fuel', 'Turon', 'Bo\'ka', 'Toshkent viloyati', 'Bo\'ka tumani', 40.731, 69.203, 25),
  azs('uz-tov-12', 'Ohangaron Neft', 'Lukoil', 'Ohangaron', 'Toshkent viloyati', 'Konchilar ko\'chasi', 40.906, 69.638, 15),
  azs('uz-tov-13', 'Yangiyo\'l-2 Oil', 'Shell', 'Yangiyo\'l', 'Toshkent viloyati', 'Yangi mahalla', 41.085, 69.062, 5),

  // —— Samarqand ——
  azs('uz-sam-6', 'Payariq Oil', 'UzPetrol', 'Payariq', 'Samarqand', 'Markaz ko\'chasi', 39.988, 66.872, 10),
  azs('uz-sam-7', 'Nurobod Neft', 'GazOil', 'Nurobod', 'Samarqand', 'Toshkent yo\'li', 39.576, 66.52, 15),
  azs('uz-sam-8', 'Bulung\'ur Fuel', 'Lukoil', 'Bulung\'ur', 'Samarqand', 'Registon yo\'li', 39.764, 67.272, 10),
  azs('uz-sam-9', 'Ishtixon Oil', 'Neftchi', 'Ishtixon', 'Samarqand', 'Markaziy bozor', 39.967, 66.486, 20),
  azs('uz-sam-10', 'Pastdarg\'om AZS', 'UzPetrol', 'Pastdarg\'om', 'Samarqand', 'Samarqand yo\'li', 39.713, 66.661, 15),
  azs('uz-sam-11', 'Tayloq Neft', 'Turon', 'Tayloq', 'Samarqand', 'Tuman markazi', 39.732, 68.774, 25),
  azs('uz-sam-12', 'Oqdaryo Fuel', 'Petroline', 'Oqdaryo', 'Samarqand', 'Yangi mahalla', 39.596, 66.952, 10),
  azs('uz-sam-13', 'Samarqand Yangi hayot', 'Shell', 'Samarqand', 'Samarqand', 'Yangi hayot mahallasi', 39.641, 66.982, 30),

  // —— Buxoro ——
  azs('uz-bux-5', 'G\'ijduvon Oil', 'Lukoil', 'G\'ijduvon', 'Buxoro', 'Markaz ko\'chasi', 40.102, 64.683, 15),
  azs('uz-bux-6', 'Romitan Neft', 'UzPetrol', 'Romitan', 'Buxoro', 'Buxoro yo\'li', 39.929, 64.381, 10),
  azs('uz-bux-7', 'Shofirkon Fuel', 'GazOil', 'Shofirkon', 'Buxoro', 'Tuman markazi', 40.12, 64.501, 20),
  azs('uz-bux-8', 'Qorako\'l Oil', 'Neftchi', 'Qorako\'l', 'Buxoro', 'Ko\'l bo\'yi', 39.508, 63.853, 25),
  azs('uz-bux-9', 'Olot AZS', 'Turon', 'Olot', 'Buxoro', 'Markaz ko\'chasi', 39.415, 63.803, 30),
  azs('uz-bux-10', 'Jondor Neft', 'UzPetrol', 'Jondor', 'Buxoro', 'Yangi mahalla', 39.721, 64.556, 15),

  // —— Qashqadaryo ——
  azs('uz-qash-6', 'Chiroqchi Oil', 'Lukoil', 'Chiroqchi', 'Qashqadaryo', 'Markaz ko\'chasi', 38.993, 66.572, 20),
  azs('uz-qash-7', 'Qamashi Fuel', 'UzPetrol', 'Qamashi', 'Qashqadaryo', 'Tuman markazi', 38.82, 66.452, 15),
  azs('uz-qash-8', 'Koson Neft', 'GazOil', 'Koson', 'Qashqadaryo', 'Qarshi yo\'li', 39.032, 65.585, 25),
  azs('uz-qash-9', 'Nishon Oil', 'Neftchi', 'Nishon', 'Qashqadaryo', 'Markaz ko\'chasi', 38.693, 65.692, 20),
  azs('uz-qash-10', 'Yakkabog\' AZS', 'Turon', 'Yakkabog\'', 'Qashqadaryo', 'Yangi mahalla', 38.976, 66.65, 15),
  azs('uz-qash-11', 'Kasbi Fuel', 'UzPetrol', 'Kasbi', 'Qashqadaryo', 'M-39 yo\'li', 38.898, 65.461, 30),
  azs('uz-qash-12', 'Dehqonobod Oil', 'Petroline', 'Dehqonobod', 'Qashqadaryo', 'Markaz', 38.336, 66.528, 35),

  // —— Surxondaryo ——
  azs('uz-sur-4', 'Boysun Neft', 'UzPetrol', 'Boysun', 'Surxondaryo', 'Tog\' yo\'li', 38.208, 67.206, 30),
  azs('uz-sur-5', 'Sherabad Oil', 'Lukoil', 'Sherabad', 'Surxondaryo', 'Markaz ko\'chasi', 37.666, 67.012, 25),
  azs('uz-sur-6', 'Uzun Fuel', 'GazOil', 'Uzun', 'Surxondaryo', 'Tuman markazi', 38.362, 67.693, 20),
  azs('uz-sur-7', 'Shurchi AZS', 'Neftchi', 'Shurchi', 'Surxondaryo', 'Markaz', 37.999, 67.788, 15),
  azs('uz-sur-8', 'Jarqo\'rg\'on Oil', 'UzPetrol', 'Jarqo\'rg\'on', 'Surxondaryo', 'Termiz yo\'li', 37.508, 67.412, 20),
  azs('uz-sur-9', 'Angor Neft', 'Turon', 'Angor', 'Surxondaryo', 'Yangi mahalla', 37.428, 67.242, 25),
  azs('uz-sur-10', 'Sariosiyo Fuel', 'Lukoil', 'Sariosiyo', 'Surxondaryo', 'Markaz', 37.412, 67.182, 30),
  azs('uz-sur-11', 'Qumqo\'rg\'on Oil', 'GazOil', 'Qumqo\'rg\'on', 'Surxondaryo', 'Markaz ko\'chasi', 37.832, 67.582, 15),

  // —— Jizzax ——
  azs('uz-jiz-3', 'Zomin Oil', 'UzPetrol', 'Zomin', 'Jizzax', 'Markaz', 39.96, 68.395, 25),
  azs('uz-jiz-4', 'Forish Neft', 'Lukoil', 'Forish', 'Jizzax', 'Tuman markazi', 40.733, 67.552, 30),
  azs('uz-jiz-5', 'Paxtakor Fuel', 'GazOil', 'Paxtakor', 'Jizzax', 'Markaz ko\'chasi', 40.312, 67.952, 15),
  azs('uz-jiz-6', 'Yangiobod AZS', 'Neftchi', 'Yangiobod', 'Jizzax', 'Yangi mahalla', 39.982, 68.302, 10),
  azs('uz-jiz-7', 'Mirzacho\'l Oil', 'UzPetrol', 'Mirzacho\'l', 'Jizzax', 'Cho\'l hududi', 40.652, 68.782, 35),
  azs('uz-jiz-8', 'Zafarobod Neft', 'Turon', 'Zafarobod', 'Jizzax', 'Markaz', 40.252, 67.822, 20),

  // —— Sirdaryo ——
  azs('uz-sir-4', 'Boyovut Oil', 'UzPetrol', 'Boyovut', 'Sirdaryo', 'Markaz', 40.692, 68.882, 10),
  azs('uz-sir-5', 'Sardoba Fuel', 'Lukoil', 'Sardoba', 'Sirdaryo', 'Tuman markazi', 40.832, 68.662, 15),
  azs('uz-sir-6', 'Mirzaobod Neft', 'GazOil', 'Mirzaobod', 'Sirdaryo', 'Markaz ko\'chasi', 40.912, 68.722, 10),
  azs('uz-sir-7', 'Xovos AZS', 'Neftchi', 'Xovos', 'Sirdaryo', 'Yangi mahalla', 40.162, 68.902, 20),
  azs('uz-sir-8', 'Oqoltin Oil', 'UzPetrol', 'Oqoltin', 'Sirdaryo', 'Markaz', 40.582, 68.782, 15),
  azs('uz-sir-9', 'Guliston-2 Fuel', 'Shell', 'Guliston', 'Sirdaryo', 'Yangi shahar', 40.502, 68.812, 5),

  // —— Navoiy ——
  azs('uz-nav-4', 'Karmana Oil', 'Lukoil', 'Karmana', 'Navoiy', 'Markaz', 40.142, 65.372, 10),
  azs('uz-nav-5', 'Nurota Neft', 'UzPetrol', 'Nurota', 'Navoiy', 'Nurota tumani', 40.562, 65.692, 25),
  azs('uz-nav-6', 'Tomdi Fuel', 'GazOil', 'Tomdi', 'Navoiy', 'Cho\'l markazi', 42.332, 64.222, 40),
  azs('uz-nav-7', 'Konimex Oil', 'Neftchi', 'Konimex', 'Navoiy', 'Markaz ko\'chasi', 40.272, 65.152, 30),
  azs('uz-nav-8', 'Qiziltepa AZS', 'Turon', 'Qiziltepa', 'Navoiy', 'Tuman markazi', 40.032, 64.852, 20),
  azs('uz-nav-9', 'Navoiy Yangi mahalla', 'Shell', 'Navoiy', 'Navoiy', 'Yangi mahalla', 40.102, 65.402, 15),

  // —— Xorazm ——
  azs('uz-xor-5', 'Gurlan Oil', 'UzPetrol', 'Gurlan', 'Xorazm', 'Markaz', 41.842, 60.392, 15),
  azs('uz-xor-6', 'Bog\'ot Neft', 'Lukoil', 'Bog\'ot', 'Xorazm', 'Tuman markazi', 41.522, 60.852, 20),
  azs('uz-xor-7', 'Qoshkopir Fuel', 'GazOil', 'Qo\'shko\'pir', 'Xorazm', 'Markaz', 41.532, 60.352, 15),
  azs('uz-xor-8', 'Yangiariq Oil', 'Neftchi', 'Yangiariq', 'Xorazm', 'Yangi mahalla', 41.332, 60.552, 10),
  azs('uz-xor-9', 'Xazorasp AZS', 'Turon', 'Xazorasp', 'Xorazm', 'Markaz', 41.302, 60.752, 15),
  azs('uz-xor-10', 'Yangibozor Neft', 'UzPetrol', 'Yangibozor', 'Xorazm', 'Bozor yonida', 41.712, 60.622, 20),

  // —— Qoraqalpog'iston ——
  azs('uz-qor-5', 'Qo\'ng\'irot Oil', 'UzPetrol', 'Qo\'ng\'irot', 'Qoraqalpog\'iston', 'Markaz', 43.082, 58.832, 35),
  azs('uz-qor-6', 'Chimboy Neft', 'Lukoil', 'Chimboy', 'Qoraqalpog\'iston', 'Nukus yo\'li', 42.702, 59.772, 30),
  azs('uz-qor-7', 'Xo\'jayli Fuel', 'GazOil', 'Xo\'jayli', 'Qoraqalpog\'iston', 'Markaz', 42.402, 59.452, 25),
  azs('uz-qor-8', 'Shumanay Oil', 'Neftchi', 'Shumanay', 'Qoraqalpog\'iston', 'Tuman markazi', 42.652, 59.772, 30),
  azs('uz-qor-9', 'Ellikqala AZS', 'Turon', 'Ellikqala', 'Qoraqalpog\'iston', 'Markaz', 41.952, 61.142, 25),
  azs('uz-qor-10', 'Tortko\'l Neft', 'UzPetrol', 'Tortko\'l', 'Qoraqalpog\'iston', 'Yangi mahalla', 41.552, 61.002, 20),
  azs('uz-qor-11', 'Kegeyli Oil', 'Shell', 'Kegeyli', 'Qoraqalpog\'iston', 'Markaz', 42.772, 59.612, 25),
  azs('uz-qor-12', 'Qanliko\'l Fuel', 'Lukoil', 'Qanliko\'l', 'Qoraqalpog\'iston', 'Markaz ko\'chasi', 42.842, 59.612, 30),

  // —— Andijon ——
  azs('uz-and-4', 'Shahrixon Oil', 'UzPetrol', 'Shahrixon', 'Andijon', 'Markaz', 40.712, 72.052, 10),
  azs('uz-and-5', 'Marhamat Neft', 'Lukoil', 'Marhamat', 'Andijon', 'Chegara yo\'li', 40.502, 72.332, 15),
  azs('uz-and-6', 'Paxtaobod Fuel', 'GazOil', 'Paxtaobod', 'Andijon', 'Markaz', 40.932, 72.412, 10),
  azs('uz-and-7', 'Izboskan Oil', 'Neftchi', 'Izboskan', 'Andijon', 'Tuman markazi', 40.912, 72.262, 15),
  azs('uz-and-8', 'Baliqchi AZS', 'Turon', 'Baliqchi', 'Andijon', 'Markaz', 40.752, 71.892, 20),
  azs('uz-and-9', 'Jalaquduq Fuel', 'UzPetrol', 'Jalaquduq', 'Andijon', 'Yangi mahalla', 40.752, 72.652, 15),
  azs('uz-and-10', 'Xo\'jaobod Neft', 'Petroline', 'Xo\'jaobod', 'Andijon', 'Markaz ko\'chasi', 40.652, 72.562, 10),
  azs('uz-and-11', 'Buloqboshi Oil', 'Shell', 'Buloqboshi', 'Andijon', 'Markaz', 40.612, 72.472, 20),

  // —— Namangan ——
  azs('uz-nam-4', 'Pop Oil', 'UzPetrol', 'Pop', 'Namangan', 'Markaz', 40.872, 71.112, 15),
  azs('uz-nam-5', 'To\'raqo\'rg\'on Neft', 'Lukoil', 'To\'raqo\'rg\'on', 'Namangan', 'Tuman markazi', 40.992, 71.512, 10),
  azs('uz-nam-6', 'Uchqo\'rg\'on Fuel', 'GazOil', 'Uchqo\'rg\'on', 'Namangan', 'Markaz', 41.082, 72.062, 20),
  azs('uz-nam-7', 'Yangiqo\'rg\'on Oil', 'Neftchi', 'Yangiqo\'rg\'on', 'Namangan', 'Yangi mahalla', 41.182, 71.732, 15),
  azs('uz-nam-8', 'Kosonsoy AZS', 'Turon', 'Kosonsoy', 'Namangan', 'Markaz', 41.252, 71.552, 25),
  azs('uz-nam-9', 'Mingbuloq Neft', 'UzPetrol', 'Mingbuloq', 'Namangan', 'Tuman markazi', 40.852, 71.462, 10),
  azs('uz-nam-10', 'Chust Oil', 'Shell', 'Chust', 'Namangan', 'Markaz ko\'chasi', 41.002, 71.232, 15),
  azs('uz-nam-11', 'Haqqulobod Fuel', 'Lukoil', 'Haqqulobod', 'Namangan', 'Yangi shahar', 40.912, 72.112, 5),

  // —— Farg'ona ——
  azs('uz-far-5', 'Rishton Oil', 'UzPetrol', 'Rishton', 'Farg\'ona', 'Markaz', 40.352, 71.272, 10),
  azs('uz-far-6', 'Bag\'dod Neft', 'Lukoil', 'Bag\'dod', 'Farg\'ona', 'Tuman markazi', 40.522, 71.192, 15),
  azs('uz-far-7', 'Beshariq Fuel', 'GazOil', 'Beshariq', 'Farg\'ona', 'Markaz', 40.432, 70.612, 20),
  azs('uz-far-8', 'Dang\'ara Oil', 'Neftchi', 'Dang\'ara', 'Farg\'ona', 'Markaz ko\'chasi', 40.582, 70.912, 15),
  azs('uz-far-9', 'Furqat AZS', 'Turon', 'Furqat', 'Farg\'ona', 'Yangi mahalla', 40.522, 71.512, 10),
  azs('uz-far-10', 'O\'zbekiston tumani Oil', 'UzPetrol', 'Yozyovon', 'Farg\'ona', 'O\'zbekiston tumani', 40.662, 71.722, 5),
  azs('uz-far-11', 'Uchko\'prik Neft', 'Petroline', 'Uchko\'prik', 'Farg\'ona', 'Markaz', 39.842, 71.112, 25),
  azs('uz-far-12', 'Buvayda Fuel', 'Lukoil', 'Buvayda', 'Farg\'ona', 'Tuman markazi', 40.612, 71.732, 10),
  azs('uz-far-13', 'Yaypan Oil', 'GazOil', 'Yaypan', 'Farg\'ona', 'Yangi mahalla', 40.382, 71.432, 15),
];
