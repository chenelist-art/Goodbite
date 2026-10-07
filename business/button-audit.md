# Button audit

A script opened the app, switched to each role, and clicked every button, menu item, link, alert card and clickable table row it could reach. After each click it checked five things:

1. Something happened (no dead buttons).
2. Buttons that name a page went to that page.
3. The page showed properly.
4. There was a way back (Back button, Close button, or the menu), and Back really went back.
5. No error appeared in the browser console.

**Result: 13,408 clicks checked, 13408 passed, 0 failed.**

| Role | Clicks checked | Different screens and pop-ups | Failed |
|---|---|---|---|
| Started as Cashier (desktop width, 1280px) | 4234 | 165 | 0 |
| Started as Kitchen staff (desktop width, 1280px) | 4346 | 164 | 0 |
| Started as Owner (desktop width, 1280px) | 4828 | 166 | 0 |

The same click-everything run was repeated with the app switched to another language, to make sure translating the screen does not break any button:

| Language | Run | Clicks checked | Failed |
|---|---|---|---|
| Bahasa Melayu | Started as Kitchen staff | 4346 | 0 |
| Chinese | Started as Owner | 4828 | 0 |

These runs check that buttons work. They do not check that the wording is good Malay or Chinese.

Note: after these runs finished, two small things were changed without re-running them: on phones the "Demo tour" button moved out of the top bar (it is still in Help), and one translated word ("More") was corrected.

Each run starts in one role. The role switcher and the Demo tour can change the role part-way, so every run also reaches some screens of the other roles. That is why the three runs overlap.

What the script cannot judge: whether a label reads clearly to a person, and typing into forms. Typing is covered by the flow test at the bottom. The full list, one row per click, is in `button-audit-full.csv`.

## The table

Rows that only differ by a name or number are grouped. "(x44)" is how many clicks are in that row. Pages for one item, order or receipt are counted under the name the script happened to open.

### Started as Owner

| Screen | Button | Where it leads | Result |
|---|---|---|---|
|  Every screen (menu and top bar) | Home / Sell / Stock and 5 more (x15) | Already on that page, stays there | Pass |
|  Every screen (menu and top bar) | Sell (x121) | Sell (main page) | Pass |
|  Every screen (menu and top bar) | Stock (x123) | Stock (main page) | Pass |
|  Every screen (menu and top bar) | Orders (x123) | Orders (main page) | Pass |
|  Every screen (menu and top bar) | Waste (x123) | Waste (main page) | Pass |
|  Every screen (menu and top bar) | Reports (x123) | Reports (main page) | Pass |
|  Every screen (menu and top bar) | Invoices 4 / Invoices 3 (x123) | Invoices (main page) | Pass |
|  Every screen (menu and top bar) | Settings (x123) | Settings (main page) | Pass |
|  Every screen (menu and top bar) | Help / Tours Replay the welcome tour, or start the s (x259) | Pop-up: Help for that page | Pass |
|  Every screen (menu and top bar) | Viewing as: Owner ▾ / Viewing as: Cashier ▾ (x128) | Pop-up: Who is using the app? | Pass |
|  Every screen (menu and top bar) | Demo tour / Home (x257) | Home (main page) | Pass |
|  Every screen (menu and top bar) | Back / Cancel / Done, back to Settings and 13 more (x222) | The page before | Pass |
|  Every screen (menu and top bar) | Viewing as: Owner ▾ (x1) | Pop-up: Who is using the app? ) | Pass |
| Add item | What does Minimum stock mean? (x2) | Pop-up: Minimum stock | Pass |
| Add item | Save item / Fix it (x5) | Add item | Pass |
| Alerts | 1 day / 2 days / 3 days and 2 more (x5) | Alerts | Pass |
| Bill ... | Mark as paid / Mark as not paid / Mark e-invoice as received (x6) | Bill ... | Pass |
| Bill ... | Open order #105 / Open order #104 / Open order #102 (x4) | Order ... | Pass |
| Bill ... | What does E-invoice mean? (x4) | Pop-up: E-invoice | Pass |
| Bill ... | What does Unique ID mean? (x2) | Pop-up: Unique ID | Pass |
| Business details | What does TIN mean? (x1) | Pop-up: TIN | Pass |
| Business details | What does Business registration number mean? (x1) | Pop-up: Business registration number | Pass |
| Business details | What does SST mean? (x1) | Pop-up: SST | Pass |
| Business details | What does Business activity code mean? (x1) | Pop-up: Business activity code | Pass |
| CN-# | Printable view (x1) | Printable view | Pass |
| CN-# | Show JSON (x1) | Pop-up: E-invoice CN-# as JSON (simplified UBL #.# layout) | Pass |
| CN-# | Cancel this e-invoice (x1) | Pop-up: Cancel e-invoice CN-#? | Pass |
| CN-# | Open receipt 14643 (x2) | Receipt ... | Pass |
| CN-# | What does Unique ID mean? (x2) | Pop-up: Unique ID | Pass |
| CN-# | What does TIN mean? (x2) | Pop-up: TIN | Pass |
| CN-# | What does Business registration number mean? (x2) | Pop-up: Business registration number | Pass |
| CN-# | What does Business activity code mean? (x2) | Pop-up: Business activity code | Pass |
| CN-# | What does Classification code mean? (x2) | Pop-up: Classification code | Pass |
| CN-# | What does Tax type mean? (x2) | Pop-up: Tax type | Pass |
| Combined e-invoice ... | What does Combined e-invoice mean? (x1) | Pop-up: Combined e-invoice | Pass |
| Combined e-invoice ... | September 2026 / October 2026 / Save and go to Check items and 4 more (x7) | Combined e-invoice ... | Pass |
| Combined e-invoice ... | Save draft and close / Back to Invoices (x2) | Invoices (main page) | Pass |
| Combined e-invoice ... | What does Classification code mean? (x2) | Pop-up: Classification code | Pass |
| Combined e-invoice ... | What does Tax type mean? (x2) | Pop-up: Tax type | Pass |
| Combined e-invoice ... | What does TIN mean? (x1) | Pop-up: TIN | Pass |
| Combined e-invoice ... | What does Business registration number mean? (x1) | Pop-up: Business registration number | Pass |
| Combined e-invoice ... | What does Business activity code mean? (x1) | Pop-up: Business activity code | Pass |
| Combined e-invoice ... | Open the e-invoice (x1) | EINV-# | Pass |
| Count saved | Back to Stock (x1) | Stock (main page) | Pass |
| Count saved | Back to Home (x1) | Home (main page) | Pass |
| Count stock | Dairy / Produce / Bakery and 3 more (x6) | Count stock | Pass |
| Count stock | Save count (x1) | Count saved | Pass |
| Credit note ... | What does Credit note mean? (x4) | Pop-up: Credit note | Pass |
| Credit note ... | Wrong items or amounts / Customer returned the order / Wrong buyer details and 6 more (x19) | Credit note ... | Pass |
| Credit note ... | Save draft and close / Back to Invoices (x5) | Invoices (main page) | Pass |
| Credit note ... | Wrong items or amounts (x2) | Already selected, stays on Credit note CN-# | Pass |
| Credit note ... | What does Classification code mean? (x2) | Pop-up: Classification code | Pass |
| Credit note ... | What does Tax type mean? (x2) | Pop-up: Tax type | Pass |
| Credit note ... | What does TIN mean? (x1) | Pop-up: TIN | Pass |
| Credit note ... | What does Business registration number mean? (x1) | Pop-up: Business registration number | Pass |
| Credit note ... | What does Business activity code mean? (x1) | Pop-up: Business activity code | Pass |
| Credit note ... | Open the e-invoice (x1) | CN-# | Pass |
| E-invoice ... | See the full limitations list (x1) | Limitations | Pass |
| E-invoice ... | Syarikat Contoh Maju Sdn Bhd (demo company) / Aina Demo (demo individual) / Buyer with a wrong TIN (shows a rejection) and 11 more (x38) | E-invoice ... | Pass |
| E-invoice ... | A business (x4) | Already selected, stays on E-invoice EINV-# | Pass |
| E-invoice ... | What does TIN mean? (x5) | Pop-up: TIN | Pass |
| E-invoice ... | What does Business registration number mean? (x5) | Pop-up: Business registration number | Pass |
| E-invoice ... | What does SST mean? (x4) | Pop-up: SST | Pass |
| E-invoice ... | Save draft and close / Fix it later (x5) | Invoices (main page) | Pass |
| E-invoice ... | What does Classification code mean? (x2) | Pop-up: Classification code | Pass |
| E-invoice ... | What does Tax type mean? (x2) | Pop-up: Tax type | Pass |
| E-invoice ... | What does Business activity code mean? (x1) | Pop-up: Business activity code | Pass |
| E-invoice ... | Back (x1) | Reports (main page) | Pass |
| E-invoice ... | Next / Back (x2) | EINV-# | Pass |
| EINV-# | Fix and send again / Issue a new e-invoice for this sale / Continue this e-invoice and 2 more (x5) | E-invoice ... | Pass |
| EINV-# | Open receipt 14585 / Open receipt 14520 / Open receipt 14643 / Open receipt 14514 (x5) | Receipt ... | Pass |
| EINV-# | What does TIN mean? (x7) | Pop-up: TIN | Pass |
| EINV-# | What does Business registration number mean? (x7) | Pop-up: Business registration number | Pass |
| EINV-# | What does Business activity code mean? (x7) | Pop-up: Business activity code | Pass |
| EINV-# | What does Classification code mean? (x7) | Pop-up: Classification code | Pass |
| EINV-# | What does Tax type mean? (x7) | Pop-up: Tax type | Pass |
| EINV-# | What does Unique ID mean? (x5) | Pop-up: Unique ID | Pass |
| EINV-# | Printable view (x3) | Printable view | Pass |
| EINV-# | Show JSON (x3) | Pop-up: E-invoice EINV-# as JSON (simplified UBL #.# layout) | Pass |
| EINV-# | Issue credit note (x3) | Credit note ... | Pass |
| EINV-# | Cancel this e-invoice (x2) | Pop-up: Cancel e-invoice EINV-#? | Pass |
| EINV-# | Delete draft (x1) | Pop-up: Delete this draft? | Pass |
| EINV-# | End tour (x1) | EINV-# | Pass |
| Enter supplier bill | What does E-invoice mean? (x2) | Pop-up: E-invoice | Pass |
| Enter supplier bill | Save bill / Fix it (x4) | Enter supplier bill | Pass |
| Espresso | Picture ☕ (x2) | Already selected, stays on Espresso | Pass |
| Espresso | Picture 🧊 / Picture 🍵 / Picture 🥤 and 32 more (x69) | Espresso | Pass |
| Espresso | What does Food cost % mean? (x2) | Pop-up: Food cost % | Pass |
| Espresso | Delete dish (x2) | Pop-up: Delete Espresso? | Pass |
| Espresso | Save dish (x2) | Menu and recipes | Pass |
| Fresh milk | Order more / Next (x2) | New order | Pass |
| Fresh milk | Log waste (x1) | Waste (main page) | Pass |
| Fresh milk | Fix the count (x1) | Pop-up: Fix the count: Fresh milk | Pass |
| Fresh milk | Edit item (x1) | Pop-up: Edit Fresh milk | Pass |
| Fresh milk | What does Use oldest first mean? (x1) | Pop-up: Use oldest first | Pass |
| Fresh milk | Log as waste (x1) | Pop-up: Log this batch as waste? | Pass |
| Fresh milk | See all waste for this item (x1) | Waste history: ... | Pass |
| Fresh milk | End tour (x1) | Fresh milk | Pass |
| Fresh milk | Back (x1) | Sale done | Pass |
| Goods received | Back to Home (x1) | Home (main page) | Pass |
| Goods received | Enter the supplier bill (x1) | Enter supplier bill | Pass |
| Goods received | See stock (x1) | Stock (main page) | Pass |
| Home (main page) | New sale / Next (x2) | Sell (main page) | Pass |
| Home (main page) | Receive delivery / Delivery from Roti Rumah Bakery Supply (demo) / Delivery from Pasar Pagi Produce (demo) is du (x3) | Receive goods | Pass |
| Home (main page) | Log waste / 2 items passed the expiry date Moved to the w (x2) | Waste (main page) | Pass |
| Home (main page) | Count stock (x1) | Count stock | Pass |
| Home (main page) | 5 items expiring in 2 days Lettuce, Sourdough / 1 more item below minimum stock Some of them  (x2) | Stock (main page) | Pass |
| Home (main page) | Fresh milk is low 5 L left. Minimum is 12 L.  / Avocado is low 6 pieces left. Minimum is 10 p / Croissant (frozen dough) is low 14 pieces lef (x3) | New order | Pass |
| Home (main page) | 3 sales have no e-invoice yet The customer as (x1) | Invoices | Pass |
| Home (main page) | Combined e-invoice for September 2026 walk-in (x1) | Combined e-invoice ... | Pass |
| Home (main page) | E-invoice EINV-26-00003 was rejected Fix the  (x1) | EINV-# | Pass |
| Home (main page) | 1 supplier bill is overdue RM 295.00 in total (x1) | Orders (main page) | Pass |
| Home (main page) | Sales today RM 1,692.15 70 bills · see them › (x1) | Recent sales | Pass |
| Home (main page) | Sales this month RM 12,252.10 Open report › / Waste this month RM 70.27 4.35 kg · see why › / Food cost this month 24.0% How it is worked o (x3) | Reports (main page) | Pass |
| Home (main page) | End tour (x1) | Home (main page) | Pass |
| Invoices | What does E-invoice mean? (x1) | Pop-up: E-invoice | Pass |
| Invoices | Issue e-invoice (x1) | Pick the sale | Pass |
| Invoices | E-invoice notes / 14716 7 Oct 2026, 6:06 pm RM 35.00 Issue e-in / 14647 7 Oct 2026, 8:19 am RM 8.50 Issue e-inv / 14645 6 Oct 2026, 7:02 pm RM 39.65 Issue e-in (x4) | E-invoice ... | Pass |
| Invoices | Combined e-invoice for September 2026 walk-in (x1) | Combined e-invoice ... | Pass |
| Invoices | All (4) / Drafts (0) / Valid (2) and 3 more (x6) | Invoices | Pass |
| Invoices | Waiting (3) (x1) | Already selected, stays on Invoices | Pass |
| Invoices (main page) | What does E-invoice mean? (x7) | Pop-up: E-invoice | Pass |
| Invoices (main page) | Issue e-invoice (x7) | Pick the sale | Pass |
| Invoices (main page) | E-invoice notes (x7) | E-invoice ... | Pass |
| Invoices (main page) | Combined e-invoice for September 2026 walk-in (x7) | Combined e-invoice ... | Pass |
| Invoices (main page) | All (4) / Waiting (3) / Drafts (0) and 5 more (x44) | Invoices (main page) | Pass |
| Invoices (main page) | EINV-26-00004 E-invoice Aina Binti Demo (DEMO / EINV-26-00003 E-invoice Kedai Ujian Enterpris / EINV-26-00002 E-invoice Aina Binti Demo (DEMO / EINV-26-00001 E-invoice Syarikat Contoh Maju  (x12) | EINV-# | Pass |
| Invoices (main page) | All (4) / Drafts (0) / Valid (2) and 3 more (x6) | Already selected, stays on Invoices (main page) | Pass |
| Invoices (main page) | INV-D-2101 Lembah Fresh Dairy Sdn Bhd (demo)  / INV-C-2102 Biji Hitam Coffee Roasters (demo)  / INV-K-2103 Kedai Kering Dry Goods (demo) RM 2 and 2 more (x5) | Bill ... | Pass |
| Language | English / Bahasa Melayu / 中文 (简体) (x3) | Language | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Create order (x1) | New order | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Edit details (x1) | Pop-up: Edit supplier ) | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | What does TIN mean? (x1) | Pop-up: TIN ) | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Fresh milk RM 7.50 / L Open › (x1) | Fresh milk | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Oat milk RM 11.00 / L Open › (x1) | Oat milk | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Whipping cream RM 16.00 / L Open › (x1) | Whipping cream | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Butter RM 38.00 / kg Open › (x1) | Butter | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Cheddar slices RM 42.00 / kg Open › (x1) | Cheddar slices | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Mozzarella RM 36.00 / kg Open › (x1) | Mozzarella | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Yogurt RM 12.00 / kg Open › (x1) | Yogurt | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Eggs RM 0.55 / piece Open › (x1) | Eggs | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Cream cheese RM 34.00 / kg Open › (x1) | Cream cheese | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | #108 28 Sep Cancelled Open › / #101 21 Sep Received Open › (x2) | Order ... | Pass |
| Menu and recipes | Add dish (x1) | New dish | Pass |
| Menu and recipes | 101 ☕ Espresso Coffee RM 8.00 RM 1.40 18% Cha (x1) | Espresso | Pass |
| Menu and recipes | 102 ☕ Americano Coffee RM 9.00 RM 1.40 16% Ch (x1) | Americano | Pass |
| Menu and recipes | 103 ☕ Latte Coffee RM 12.00 RM 2.90 24% Chang (x1) | Latte | Pass |
| Menu and recipes | 104 ☕ Cappuccino Coffee RM 12.00 RM 2.75 23%  (x1) | Cappuccino | Pass |
| Menu and recipes | 105 ☕ Flat White Coffee RM 12.00 RM 2.60 22%  (x1) | Flat White | Pass |
| Menu and recipes | 106 ☕ Mocha Coffee RM 14.00 RM 3.32 24% Chang (x1) | Mocha | Pass |
| Menu and recipes | 107 ☕ Caramel Latte Coffee RM 14.00 RM 3.42 2 (x1) | Caramel Latte | Pass |
| Menu and recipes | 108 ☕ Gula Melaka Latte Coffee RM 14.00 RM 3. (x1) | Gula Melaka Latte | Pass |
| Menu and recipes | 109 🧊 Iced Long Black Coffee RM 10.00 RM 1.4 (x1) | Iced Long Black | Pass |
| Menu and recipes | 201 🍵 Matcha Latte Drinks RM 14.00 RM 2.53 1 (x1) | Matcha Latte | Pass |
| Menu and recipes | 202 🍫 Hot Chocolate Drinks RM 12.00 RM 3.05  (x1) | Hot Chocolate | Pass |
| Menu and recipes | 203 🫖 Teh Tarik Special Drinks RM 7.00 RM 1. (x1) | Teh Tarik Special | Pass |
| Menu and recipes | 204 🍋 Lemon Honey Soda Drinks RM 10.00 RM 1. (x1) | Lemon Honey Soda | Pass |
| Menu and recipes | 205 🥤 Limau Kasturi Cooler Drinks RM 9.00 RM (x1) | Limau Kasturi Cooler | Pass |
| Menu and recipes | 206 🥭 Mango Smoothie Drinks RM 14.00 RM 3.30 (x1) | Mango Smoothie | Pass |
| Menu and recipes | 207 🫐 Berry Smoothie Drinks RM 15.00 RM 6.55 (x1) | Berry Smoothie | Pass |
| Menu and recipes | 208 🍊 Orange Juice Drinks RM 11.00 RM 2.70 2 (x1) | Orange Juice | Pass |
| Menu and recipes | 301 🍳 Big Breakfast Breakfast RM 26.00 RM 7. (x1) | Big Breakfast | Pass |
| Menu and recipes | 302 🥑 Avocado Toast Breakfast RM 19.00 RM 7. (x1) | Avocado Toast | Pass |
| Menu and recipes | 303 🥯 Smoked Salmon Bagel Breakfast RM 24.00 (x1) | Smoked Salmon Bagel | Pass |
| Menu and recipes | 304 🍞 Scrambled Eggs on Toast Breakfast RM 1 (x1) | Scrambled Eggs on Toast | Pass |
| Menu and recipes | 305 🥞 Banana Pancakes Breakfast RM 17.00 RM  (x1) | Banana Pancakes | Pass |
| Menu and recipes | 306 🥣 Berry Yogurt Bowl Breakfast RM 15.00 R (x1) | Berry Yogurt Bowl | Pass |
| Menu and recipes | 307 🍛 Nasi Lemak Ayam Breakfast RM 16.00 RM  (x1) | Nasi Lemak Ayam | Pass |
| Menu and recipes | 401 🍔 Chicken Burger Mains RM 22.00 RM 5.60  (x1) | Chicken Burger | Pass |
| Menu and recipes | 402 🍔 Beef Burger Mains RM 26.00 RM 8.61 33% (x1) | Beef Burger | Pass |
| Menu and recipes | 403 🌯 Chicken Caesar Wrap Mains RM 19.00 RM  (x1) | Chicken Caesar Wrap | Pass |
| Menu and recipes | 404 🥪 Tuna Melt Sandwich Mains RM 18.00 RM 5 (x1) | Tuna Melt Sandwich | Pass |
| Menu and recipes | 405 🍝 Mushroom Aglio Olio Mains RM 20.00 RM  (x1) | Mushroom Aglio Olio | Pass |
| Menu and recipes | 406 🍝 Prawn Aglio Olio Mains RM 26.00 RM 5.9 (x1) | Prawn Aglio Olio | Pass |
| Menu and recipes | 407 🍝 Tomato Chicken Pasta Mains RM 22.00 RM (x1) | Tomato Chicken Pasta | Pass |
| Menu and recipes | 408 🍚 Nasi Goreng Kampung Mains RM 16.00 RM  (x1) | Nasi Goreng Kampung | Pass |
| Menu and recipes | 409 🥗 Garden Salad Mains RM 15.00 RM 4.90 33 (x1) | Garden Salad | Pass |
| Menu and recipes | 410 🥐 Turkey Ham Cheese Croissant Mains RM 1 (x1) | Turkey Ham Cheese Croissant | Pass |
| Menu and recipes | 411 🍟 Fries Mains RM 9.00 RM 0.97 11% Change (x1) | Fries | Pass |
| Menu and recipes | 501 🥐 Butter Croissant Bakery RM 8.00 RM 2.3 (x1) | Butter Croissant | Pass |
| Menu and recipes | 502 🥐 Almond Croissant Bakery RM 11.00 RM 3. (x1) | Almond Croissant | Pass |
| Menu and recipes | 503 🍫 Chocolate Brownie Bakery RM 10.00 RM 3 (x1) | Chocolate Brownie | Pass |
| Menu and recipes | 504 🍌 Banana Bread Slice Bakery RM 8.00 RM 1 (x1) | Banana Bread Slice | Pass |
| Menu and recipes | 505 🍰 Burnt Cheesecake Slice Bakery RM 15.00 (x1) | Burnt Cheesecake Slice | Pass |
| Menu and recipes | 506 🧁 Berry Muffin Bakery RM 8.00 RM 2.34 29 (x1) | Berry Muffin | Pass |
| Menu and recipes | 507 🍰 Gula Melaka Cake Slice Bakery RM 12.00 (x1) | Gula Melaka Cake Slice | Pass |
| Menu and recipes | 508 🥯 Bagel with Cream Cheese Bakery RM 10.0 (x1) | Bagel with Cream Cheese | Pass |
| Menu and recipes | 509 🍞 Garlic Toast Bakery RM 7.00 RM 1.52 22 (x1) | Garlic Toast | Pass |
| New dish | Picture ☕ / Picture 🧊 / Picture 🍵 and 33 more (x72) | New dish | Pass |
| New dish | Picture 🍽️ (x2) | Already selected, stays on New dish | Pass |
| New dish | What does Food cost % mean? (x2) | Pop-up: Food cost % | Pass |
| New order | Less Fresh milk / More Fresh milk / More Oat milk and 27 more (x37) | New order | Pass |
| New order | Send order to Lembah Fresh Dairy Sdn Bhd (x1) | Order ... | Pass |
| New order | Back (x1) | Fresh milk | Pass |
| New order | Next (x1) | Receive goods | Pass |
| Order ... | Order from this supplier again (x1) | New order | Pass |
| Order ... | Whipping cream 4 L 0 L RM 16.00 RM 64.00 (x1) | Whipping cream | Pass |
| Order ... | Receive goods (x2) | Receive goods | Pass |
| Order ... | Cancel order (x1) | Pop-up: Cancel order #? | Pass |
| Order ... | Spinach 2 kg 0 kg RM 12.00 RM 24.00 (x1) | Spinach | Pass |
| Order ... | Mushrooms 3 kg 0 kg RM 18.00 RM 54.00 (x1) | Mushrooms | Pass |
| Order ... | Mango 4 kg 0 kg RM 9.00 RM 36.00 (x1) | Mango | Pass |
| Order ... | Lemon 30 pieces 0 pieces RM 1.20 RM 36.00 (x1) | Lemon | Pass |
| Order ... | Lettuce 4 kg 0 kg RM 9.00 RM 36.00 / Lettuce 5 kg 5 kg All in RM 9.00 RM 45.00 (x2) | Lettuce | Pass |
| Order ... | Close order (the rest is not coming) (x1) | Pop-up: Close order #? | Pass |
| Order ... | Sourdough loaf 12 loaves 6 loaves Part RM 9.0 (x1) | Sourdough loaf | Pass |
| Order ... | Burger bun 40 pieces 20 pieces Part RM 1.10 R (x1) | Burger bun | Pass |
| Order ... | Bagel 24 pieces 12 pieces Part RM 2.00 RM 48. (x1) | Bagel | Pass |
| Order ... | Open the supplier bill (x1) | Bill ... | Pass |
| Order ... | Tomato 8 kg 8 kg All in RM 6.00 RM 48.00 (x1) | Tomato | Pass |
| Order ... | Banana 6 kg 6 kg All in RM 5.50 RM 33.00 (x1) | Banana | Pass |
| Order ... | Avocado 24 pieces 24 pieces All in RM 5.50 RM (x1) | Avocado | Pass |
| Order ... | Back to Orders (x1) | Orders (main page) | Pass |
| Order ... | Back to Home (x1) | Home (main page) | Pass |
| Order ... | Open this order (x1) | Order ... | Pass |
| Orders (main page) | Create order / Turn into an order (1 item) (x7) | New order | Pass |
| Orders (main page) | Receive delivery (x3) | Receive goods | Pass |
| Orders (main page) | Orders (8) / Suggested (4) / Suppliers (6) / Supplier bills (5) (x16) | Orders (main page) | Pass |
| Orders (main page) | #108 Lembah Fresh Dairy Sdn Bhd (demo) 28 Sep / #107 Pasar Pagi Produce (demo) 6 Oct 7 Oct RM / #106 Roti Rumah Bakery Supply (demo) 5 Oct 7  and 5 more (x16) | Order ... | Pass |
| Orders (main page) | Enter supplier bill (x1) | Enter supplier bill | Pass |
| Orders (main page) | Supplier bills (5) / Orders (8) / Suggested (4) / Suppliers (6) (x4) | Already selected, stays on Orders (main page) | Pass |
| Orders (main page) | What does E-invoice mean? (x1) | Pop-up: E-invoice | Pass |
| Orders (main page) | INV-P-2105 Pasar Pagi Produce (demo) 4 Oct 17 / INV-M-2104 Ayam & Laut Fresh Proteins (demo)  / INV-K-2103 Kedai Kering Dry Goods (demo) 27 S and 2 more (x5) | Bill ... | Pass |
| Orders (main page) | Add supplier (x1) | Pop-up: Add supplier | Pass |
| Orders (main page) | Lembah Fresh Dairy Sdn Bhd (demo) 03-5550 010 (x1) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Orders (main page) | Pasar Pagi Produce (demo) 03-5550 0102 1 day  (x1) | Pasar Pagi Produce (demo) | Pass |
| Orders (main page) | Roti Rumah Bakery Supply (demo) 03-5550 0103  (x1) | Roti Rumah Bakery Supply (demo) | Pass |
| Orders (main page) | Biji Hitam Coffee Roasters (demo) 03-5550 010 (x1) | Biji Hitam Coffee Roasters (demo) | Pass |
| Orders (main page) | Kedai Kering Dry Goods (demo) 03-5550 0105 2  (x1) | Kedai Kering Dry Goods (demo) | Pass |
| Orders (main page) | Ayam & Laut Fresh Proteins (demo) 03-5550 010 (x1) | Ayam & Laut Fresh Proteins (demo) | Pass |
| Payment | End tour / Card / DuitNow QR and 9 more (x34) | Payment | Pass |
| Payment | Back (x1) | Sell (main page) | Pass |
| Payment | Next / Confirm payment of RM 24.50 / Confirm payment of RM 14.85 (x8) | Sale done | Pass |
| Payment | Cash / RM 30.00 / Card and 2 more (x9) | Already selected, stays on Payment | Pass |
| Payment | What does SST mean? (x8) | Pop-up: SST | Pass |
| Payment | What does Rounding mean? (x8) | Pop-up: Rounding | Pass |
| Payment | What does Service charge mean? (x4) | Pop-up: Service charge | Pass |
| Pick the sale | 14716 Waiting 7 Oct 2026, 6:06 pm Takeaway RM / 14715 7 Oct 2026, 6:40 pm Takeaway RM 15.90 P / 14714 7 Oct 2026, 6:17 pm Takeaway RM 59.35 P and 57 more (x60) | E-invoice ... | Pass |
| Pop-up: Add supplier | Close / Cancel (x4) | Orders (main page) | Pass |
| Pop-up: Add supplier | Save supplier (x2) | Pop-up: Add supplier | Pass |
| Pop-up: Cancel e-invoice CN-#? | Close / No, keep it / Yes, cancel this e-invoice (x5) | CN-# | Pass |
| Pop-up: Cancel e-invoice CN-#? | Wrong buyer details / Wrong items or amounts / Issued by mistake (x5) | Pop-up: Cancel e-invoice CN-#? | Pass |
| Pop-up: Cancel e-invoice CN-#? | Wrong buyer details (x1) | Already selected, stays on Pop-up: Cancel e-invoice CN-#? | Pass |
| Pop-up: Cancel e-invoice EINV-#? | Close / No, keep it / Yes, cancel this e-invoice (x10) | EINV-# | Pass |
| Pop-up: Cancel e-invoice EINV-#? | Wrong buyer details / Wrong items or amounts / Issued by mistake (x10) | Pop-up: Cancel e-invoice EINV-#? | Pass |
| Pop-up: Cancel e-invoice EINV-#? | Wrong buyer details (x2) | Already selected, stays on Pop-up: Cancel e-invoice EINV-#? | Pass |
| Pop-up: Cancel order #? | Close / No, keep it / Yes, cancel the order (x3) | Order ... | Pass |
| Pop-up: Cancel the e-invoice first | Close / Go back (x2) | Receipt ... | Pass |
| Pop-up: Cancel the e-invoice first | Open the e-invoice (x1) | EINV-# | Pass |
| Pop-up: Clear this bill? | Close / No, keep it / Yes, clear the bill (x12) | Sell (main page) | Pass |
| Pop-up: Close order #? | Close / No, go back / Yes, close the order (x3) | Order ... | Pass |
| Pop-up: Combined e-invoice | Close / Got it (x2) | Combined e-invoice ... | Pass |
| Pop-up: Daily sales for October # | Close (x6) | Sales by day, October # | Pass |
| Pop-up: Daily sales for October # | Download file / Copy all (x6) | Pop-up: Daily sales for October # | Pass |
| Pop-up: Delete Espresso? | Close / No, keep it (x4) | Espresso | Pass |
| Pop-up: Delete Espresso? | Yes, delete this dish (x2) | Menu and recipes | Pass |
| Pop-up: Delete this draft? | Close / No, keep it (x2) | EINV-# | Pass |
| Pop-up: Delete this draft? | Yes, delete the draft (x1) | Invoices (main page) | Pass |
| Pop-up: E-invoice | Close / Got it (x2) | Invoices (main page) | Pass |
| Pop-up: E-invoice | Close / Got it (x2) | Orders (main page) | Pass |
| Pop-up: E-invoice | Close / Got it (x2) | Enter supplier bill | Pass |
| Pop-up: E-invoice | Close / Got it (x2) | Bill ... | Pass |
| Pop-up: E-invoice CN-# as JSON (simplified UBL #.# layout) | Close (x6) | CN-# | Pass |
| Pop-up: E-invoice CN-# as JSON (simplified UBL #.# layout) | Download file / Copy all (x6) | Pop-up: E-invoice CN-# as JSON (simplified UBL #.# layout) | Pass |
| Pop-up: E-invoice EINV-# as JSON (simplified UBL #.# layout) | Close (x18) | EINV-# | Pass |
| Pop-up: E-invoice EINV-# as JSON (simplified UBL #.# layout) | Download file / Copy all (x18) | Pop-up: E-invoice EINV-# as JSON (simplified UBL #.# layout) | Pass |
| Pop-up: Edit Fresh milk | Close / Cancel / Save changes (x3) | Fresh milk | Pass |
| Pop-up: Edit Fresh milk | What does Minimum stock mean? (x1) | Pop-up: Minimum stock | Pass |
| Pop-up: Edit supplier ) | Close / Cancel / Save supplier (x3) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Pop-up: Fix the count: Fresh milk | Close / Cancel / Save the new count (x3) | Fresh milk | Pass |
| Pop-up: Food Rescue | Close / Got it (x2) | Waste (main page) | Pass |
| Pop-up: Food cost % | Close / Got it (x2) | Reports (main page) | Pass |
| Pop-up: Food cost % | Close / Got it (x2) | New dish | Pass |
| Pop-up: Held bills | Close / Back to the till / Table ? · RM 16.30 1 item · held at 7:52 pm B and 2 more (x16) | Sell (main page) | Pass |
| Pop-up: Help: Add item | Close / Close help / English and 2 more (x5) | Add item | Pass |
| Pop-up: Help: Add item | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Add item | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Add item | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Alerts | Close / Close help / English and 2 more (x5) | Alerts | Pass |
| Pop-up: Help: Alerts | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Alerts | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Alerts | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Bill INV-P-# | Close / Close help / English and 2 more (x5) | Bill ... | Pass |
| Pop-up: Help: Bill INV-P-# | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Bill INV-P-# | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Bill INV-P-# | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Business details | Close / Close help / English and 2 more (x5) | Business details | Pass |
| Pop-up: Help: Business details | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Business details | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Business details | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Combined e-invoice EINV-# | Close / Close help / English and 2 more (x5) | Combined e-invoice ... | Pass |
| Pop-up: Help: Combined e-invoice EINV-# | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Combined e-invoice EINV-# | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Combined e-invoice EINV-# | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Count saved | Close / Close help / English and 2 more (x5) | Count saved | Pass |
| Pop-up: Help: Count saved | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Count saved | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Count saved | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Count stock | Close / Close help / English and 2 more (x5) | Count stock | Pass |
| Pop-up: Help: Count stock | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Count stock | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Count stock | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: E-invoice notes | Close / Close help / E-invoice notes and 3 more (x6) | E-invoice ... | Pass |
| Pop-up: Help: E-invoice notes | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: E-invoice notes | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: EINV-# | Close / Close help / English and 2 more (x5) | EINV-# | Pass |
| Pop-up: Help: EINV-# | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: EINV-# | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: EINV-# | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Enter supplier bill | Close / Close help / English and 2 more (x5) | Enter supplier bill | Pass |
| Pop-up: Help: Enter supplier bill | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Enter supplier bill | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Enter supplier bill | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Fresh milk | Close / Close help / English and 2 more (x5) | Fresh milk | Pass |
| Pop-up: Help: Fresh milk | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Fresh milk | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Fresh milk | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Goods received | Close / Close help / English and 2 more (x5) | Goods received | Pass |
| Pop-up: Help: Goods received | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Goods received | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Goods received | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Home | Close / Close help / Start the demo tour and 3 more (x6) | Home (main page) | Pass |
| Pop-up: Help: Home | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Home | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Invoices | Close / Close help / English and 2 more (x5) | Invoices (main page) | Pass |
| Pop-up: Help: Invoices | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Invoices | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Invoices | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Language | Close / Close help / English and 2 more (x5) | Language | Pass |
| Pop-up: Help: Language | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Language | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Language | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Lembah Fresh Dairy Sdn Bhd (demo) ) | Close / Close help / English and 2 more (x5) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Pop-up: Help: Lembah Fresh Dairy Sdn Bhd (demo) ) | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Lembah Fresh Dairy Sdn Bhd (demo) ) | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Lembah Fresh Dairy Sdn Bhd (demo) ) | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Limitations | Close / Close help / English and 2 more (x5) | Limitations | Pass |
| Pop-up: Help: Limitations | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Limitations | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Limitations | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Menu and recipes | Close / Close help / English and 2 more (x5) | Menu and recipes | Pass |
| Pop-up: Help: Menu and recipes | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Menu and recipes | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Menu and recipes | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: New dish | Close / Close help / English and 2 more (x5) | New dish | Pass |
| Pop-up: Help: New dish | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: New dish | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: New dish | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: New order | Close / Close help / English and 2 more (x5) | New order | Pass |
| Pop-up: Help: New order | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: New order | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: New order | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Order # | Close / Close help / English and 2 more (x5) | Order ... | Pass |
| Pop-up: Help: Order # | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Order # | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Order # | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Order sent | Close / Close help / English and 2 more (x5) | Order ... | Pass |
| Pop-up: Help: Order sent | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Order sent | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Order sent | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Orders | Close / Close help / English and 2 more (x5) | Orders (main page) | Pass |
| Pop-up: Help: Orders | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Orders | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Orders | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Payment | Close / Close help / English and 2 more (x5) | Payment | Pass |
| Pop-up: Help: Payment | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Payment | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Payment | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Pick the sale | Close / Close help / English and 2 more (x5) | Pick the sale | Pass |
| Pop-up: Help: Pick the sale | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Pick the sale | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Pick the sale | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Printable view | Close / Close help / English and 2 more (x5) | Printable view | Pass |
| Pop-up: Help: Printable view | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Printable view | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Printable view | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Receipt # | Close / Close help / English and 2 more (x5) | Receipt ... | Pass |
| Pop-up: Help: Receipt # | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Receipt # | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Receipt # | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Receive goods | Close / Close help / English and 2 more (x5) | Receive goods | Pass |
| Pop-up: Help: Receive goods | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Receive goods | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Receive goods | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Recent sales | Close / Close help / English and 2 more (x5) | Recent sales | Pass |
| Pop-up: Help: Recent sales | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Recent sales | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Recent sales | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Reports | Close / Close help / English and 2 more (x5) | Reports (main page) | Pass |
| Pop-up: Help: Reports | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Reports | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Reports | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Sale done | Close / Close help / English and 2 more (x5) | Sale done | Pass |
| Pop-up: Help: Sale done | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Sale done | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Sales by day, October # | Close / Close help / English and 2 more (x5) | Sales by day, October # | Pass |
| Pop-up: Help: Sales by day, October # | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Sales by day, October # | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Sales by day, October # | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Sell | Close / Close help / English and 2 more (x5) | Sell (main page) | Pass |
| Pop-up: Help: Sell | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Sell | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Sell | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Settings | Close / Close help / English and 2 more (x5) | Settings (main page) | Pass |
| Pop-up: Help: Settings | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Settings | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Settings | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Stock | Close / Close help / English and 2 more (x5) | Stock (main page) | Pass |
| Pop-up: Help: Stock | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Stock | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Stock | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Tax and rounding | Close / Close help / English and 2 more (x5) | Tax and rounding | Pass |
| Pop-up: Help: Tax and rounding | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Tax and rounding | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Tax and rounding | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Waste | Close / Close help / English and 2 more (x5) | Waste (main page) | Pass |
| Pop-up: Help: Waste | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Waste | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Waste | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Waste entries, October # | Close / Close help / English and 2 more (x5) | Waste entries, October # | Pass |
| Pop-up: Help: Waste entries, October # | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Waste entries, October # | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Waste entries, October # | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Waste history: Mushrooms | Close / Close help / English and 2 more (x5) | Waste history: ... | Pass |
| Pop-up: Help: Waste history: Mushrooms | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Waste history: Mushrooms | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Waste history: Mushrooms | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: How food cost is worked out | Close / Got it (x2) | Reports (main page) | Pass |
| Pop-up: Ingredients used by receipt # | Close (x2) | Sale done | Pass |
| Pop-up: Log this batch as waste? | Close / No, go back / Yes, log as waste (x3) | Stock (main page) | Pass |
| Pop-up: Log this batch as waste? | Close / No, go back / Yes, log as waste (x3) | Fresh milk | Pass |
| Pop-up: Minimum stock | Close / Got it (x2) | Stock (main page) | Pass |
| Pop-up: Minimum stock | Close / Got it (x2) | Add item | Pass |
| Pop-up: Offer Lettuce for rescue | Close / Cancel / Kind Kitchen KL (demo partner) Made-up partne and 2 more (x5) | Stock (main page) | Pass |
| Pop-up: Offer Lettuce for rescue | Close / Cancel / Kind Kitchen KL (demo partner) Made-up partne and 2 more (x25) | Waste (main page) | Pass |
| Pop-up: Remove this waste entry? | Close / No, keep it / Yes, remove the entry (x3) | Waste history: ... | Pass |
| Pop-up: Reset all demo data? | Close / No, keep my data (x2) | Settings (main page) | Pass |
| Pop-up: Reset all demo data? | Yes, reset everything (x1) | Home (main page) | Pass |
| Pop-up: SST | Close / Got it (x2) | Sell (main page) | Pass |
| Pop-up: SST | Close / Got it (x2) | Payment | Pass |
| Pop-up: Service charge | Close / Got it (x2) | Tax and rounding | Pass |
| Pop-up: TIN | Close / Got it (x2) | EINV-# | Pass |
| Pop-up: TIN | Close / Got it (x2) | Business details | Pass |
| Pop-up: TIN ) | Close / Got it (x2) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Pop-up: Use oldest first | Close / Got it (x2) | Fresh milk | Pass |
| Pop-up: Void receipt ... | Close / No, keep the sale / Yes, void this sale (x10) | Receipt ... | Pass |
| Pop-up: Void receipt ... | Keyed in by mistake (nothing was made) Ingred / Test sale Ingredients go back into stock. / Customer cancelled (food was already made) In (x10) | Pop-up: Void receipt ... | Pass |
| Pop-up: Void receipt ... | Keyed in by mistake (nothing was made) Ingred (x2) | Already selected, stays on Pop-up: Void receipt #? | Pass |
| Pop-up: Waste log for October # | Close (x6) | Reports (main page) | Pass |
| Pop-up: Waste log for October # | Download file / Copy all (x12) | Pop-up: Waste log for October # | Pass |
| Pop-up: Waste log for October # | Close (x6) | Waste entries, October # | Pass |
| Pop-up: Who is using the app? | Close / Owner / Manager Sees everything: sales, stock / Cashier Sees the till only: take orders, take / Kitchen / Store staff Sees stock, deliveries  (x115) | Home (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Sell (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Stock (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Orders (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Waste (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Reports (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Invoices (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Settings (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Receive goods | Pass |
| Pop-up: Who is using the app? | Close (x1) | Count stock | Pass |
| Pop-up: Who is using the app? | Close (x1) | New order | Pass |
| Pop-up: Who is using the app? | Close (x1) | Combined e-invoice ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | EINV-# | Pass |
| Pop-up: Who is using the app? | Close (x1) | Recent sales | Pass |
| Pop-up: Who is using the app? | Close (x1) | Add item | Pass |
| Pop-up: Who is using the app? | Close (x1) | Fresh milk | Pass |
| Pop-up: Who is using the app? | Close (x2) | Order ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Waste history: ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Sales by day, October # | Pass |
| Pop-up: Who is using the app? | Close (x1) | Waste entries, October # | Pass |
| Pop-up: Who is using the app? | Close (x1) | Pick the sale | Pass |
| Pop-up: Who is using the app? | Close (x1) | E-invoice ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Business details | Pass |
| Pop-up: Who is using the app? | Close (x1) | Tax and rounding | Pass |
| Pop-up: Who is using the app? | Close (x1) | Menu and recipes | Pass |
| Pop-up: Who is using the app? | Close (x1) | Alerts | Pass |
| Pop-up: Who is using the app? | Close (x1) | Limitations | Pass |
| Pop-up: Who is using the app? | Close (x1) | Language | Pass |
| Pop-up: Who is using the app? | Close (x1) | Count saved | Pass |
| Pop-up: Who is using the app? | Close (x1) | Receipt ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Enter supplier bill | Pass |
| Pop-up: Who is using the app? | Close (x1) | Bill ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Printable view | Pass |
| Pop-up: Who is using the app? | Close (x1) | New dish | Pass |
| Pop-up: Who is using the app? | Close (x1) | Goods received | Pass |
| Pop-up: Who is using the app? | Close (x1) | Payment | Pass |
| Pop-up: Who is using the app? | Close (x1) | Sale done | Pass |
| Pop-up: Who is using the app? ) | Close (x1) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Pop-up: Who is using the app? ) | Owner / Manager Sees everything: sales, stock / Cashier Sees the till only: take orders, take / Kitchen / Store staff Sees stock, deliveries  (x3) | Home (main page) | Pass |
| Pop-up: ☕ Espresso | Close / Cancel / Add to bill · RM 8.00 / Add to bill · RM 11.00 (x48) | Sell (main page) | Pass |
| Pop-up: ☕ Espresso | Extra coffee shot +RM 3.00 / Vanilla syrup +RM 1.50 (x32) | Pop-up: ☕ Espresso | Pass |
| Printable view | Print or save as PDF (x1) | Printable view | Pass |
| Receipt ... | Issue e-invoice for this sale (x2) | E-invoice ... | Pass |
| Receipt ... | Print / Customer will ask for an e-invoice later / Stop waiting for an e-invoice (x5) | Receipt ... | Pass |
| Receipt ... | Void this sale (x2) | Pop-up: Void receipt ... | Pass |
| Receipt ... | Open its e-invoice (x1) | EINV-# | Pass |
| Receipt ... | Void this sale (x1) | Pop-up: Cancel the e-invoice first | Pass |
| Receive goods | Order #106 · Roti Rumah Bakery Supply (demo)  / Order #107 · Pasar Pagi Produce (demo) 5 item / Pick another order and 3 more (x12) | Receive goods | Pass |
| Receive goods | Confirm goods received (x1) | Goods received | Pass |
| Receive goods | Back (x1) | New order | Pass |
| Receive goods | Next (x1) | Waste (main page) | Pass |
| Recent sales | New sale (x1) | Sell (main page) | Pass |
| Recent sales | Today / Yesterday / 5 Oct (x3) | Recent sales | Pass |
| Recent sales | 14716 6:06 pm Takeaway DuitNow QR RM 35.00 Wa / 14715 6:40 pm Takeaway Card RM 15.90 Paid Ope / 14714 6:17 pm Takeaway DuitNow QR RM 59.35 Pa and 67 more (x70) | Receipt ... | Pass |
| Reports (main page) | Copy waste log as spreadsheet (x1) | Pop-up: Waste log for October # | Pass |
| Reports (main page) | Copy daily sales as spreadsheet (x1) | Pop-up: Daily sales for October # | Pass |
| Reports (main page) | October 2026 / September 2026 / August 2026 / End tour (x4) | Reports (main page) | Pass |
| Reports (main page) | Sales (with tax) RM 12,252.10 527 bills · see (x1) | Sales by day, October # | Pass |
| Reports (main page) | Food cost 24.0% RM 2,617.38 of ingredients ·  (x1) | Pop-up: How food cost is worked out | Pass |
| Reports (main page) | Waste RM 70.27 4.35 kg · see every entry › (x1) | Waste entries, October # | Pass |
| Reports (main page) | Rescued instead of binned 0 kg Open Food Resc / Back (x2) | Waste (main page) | Pass |
| Reports (main page) | Cream cheese 0.74 kg RM 25.30 History › / Yogurt 1.1 kg RM 13.15 History › / Turkey ham 0.35 kg RM 11.17 History › and 3 more (x6) | Waste history: ... | Pass |
| Reports (main page) | What does Food cost % mean? (x1) | Pop-up: Food cost % | Pass |
| Reports (main page) | Next (x1) | E-invoice ... | Pass |
| Sale done | End tour / Customer will ask for an e-invoice later (x2) | Sale done | Pass |
| Sale done | Back (x1) | Payment | Pass |
| Sale done | Next (x1) | Fresh milk | Pass |
| Sale done | See what was used (x1) | Pop-up: Ingredients used by receipt # | Pass |
| Sale done | New sale (x1) | Sell (main page) | Pass |
| Sale done | Issue e-invoice for this sale (x1) | E-invoice ... | Pass |
| Sale done | View receipt (x1) | Receipt ... | Pass |
| Sale done | Back to Home (x1) | Home (main page) | Pass |
| Sales by day, October # | Copy as spreadsheet (x1) | Pop-up: Daily sales for October # | Pass |
| Sell (main page) | Today's sales (x8) | Recent sales | Pass |
| Sell (main page) | All / Coffee / Drinks and 28 more (x221) | Sell (main page) | Pass |
| Sell (main page) | ☕ Espresso Code 101 · has options RM 8.00 (x8) | Pop-up: ☕ Espresso | Pass |
| Sell (main page) | ☕ Americano Code 102 · has options RM 9.00 (x8) | Pop-up: ☕ Americano | Pass |
| Sell (main page) | ☕ Latte Code 103 · has options RM 12.00 (x8) | Pop-up: ☕ Latte | Pass |
| Sell (main page) | ☕ Cappuccino Code 104 · has options RM 12.00 (x8) | Pop-up: ☕ Cappuccino | Pass |
| Sell (main page) | ☕ Flat White Code 105 · has options RM 12.00 (x8) | Pop-up: ☕ Flat White | Pass |
| Sell (main page) | ☕ Mocha Code 106 · has options RM 14.00 (x8) | Pop-up: ☕ Mocha | Pass |
| Sell (main page) | ☕ Caramel Latte Code 107 · has options RM 14. (x8) | Pop-up: ☕ Caramel Latte | Pass |
| Sell (main page) | ☕ Gula Melaka Latte Code 108 · has options RM (x8) | Pop-up: ☕ Gula Melaka Latte | Pass |
| Sell (main page) | 🧊 Iced Long Black Code 109 · has options RM  (x8) | Pop-up: 🧊 Iced Long Black | Pass |
| Sell (main page) | 🍵 Matcha Latte Code 201 · has options RM 14. (x8) | Pop-up: 🍵 Matcha Latte | Pass |
| Sell (main page) | 🍫 Hot Chocolate Code 202 · has options RM 12 (x8) | Pop-up: 🍫 Hot Chocolate | Pass |
| Sell (main page) | 🫖 Teh Tarik Special Code 203 · has options R (x8) | Pop-up: 🫖 Teh Tarik Special | Pass |
| Sell (main page) | 🍋 Lemon Honey Soda Code 204 · has options RM (x8) | Pop-up: 🍋 Lemon Honey Soda | Pass |
| Sell (main page) | 🥤 Limau Kasturi Cooler Code 205 · has option (x8) | Pop-up: 🥤 Limau Kasturi Cooler | Pass |
| Sell (main page) | 🍳 Big Breakfast Code 301 · has options RM 26 (x8) | Pop-up: 🍳 Big Breakfast | Pass |
| Sell (main page) | 🥑 Avocado Toast Code 302 · has options RM 19 (x8) | Pop-up: 🥑 Avocado Toast | Pass |
| Sell (main page) | 🍞 Scrambled Eggs on Toast Code 304 · has opt (x8) | Pop-up: 🍞 Scrambled Eggs on Toast | Pass |
| Sell (main page) | 🍛 Nasi Lemak Ayam Code 307 · has options RM  (x8) | Pop-up: 🍛 Nasi Lemak Ayam | Pass |
| Sell (main page) | 🍔 Chicken Burger Code 401 · has options RM 2 (x8) | Pop-up: 🍔 Chicken Burger | Pass |
| Sell (main page) | 🍔 Beef Burger Code 402 · has options RM 26.0 (x8) | Pop-up: 🍔 Beef Burger | Pass |
| Sell (main page) | 🍝 Mushroom Aglio Olio Code 405 · has options (x8) | Pop-up: 🍝 Mushroom Aglio Olio | Pass |
| Sell (main page) | 🍝 Prawn Aglio Olio Code 406 · has options RM (x8) | Pop-up: 🍝 Prawn Aglio Olio | Pass |
| Sell (main page) | 🍝 Tomato Chicken Pasta Code 407 · has option (x8) | Pop-up: 🍝 Tomato Chicken Pasta | Pass |
| Sell (main page) | 🍚 Nasi Goreng Kampung Code 408 · has options (x8) | Pop-up: 🍚 Nasi Goreng Kampung | Pass |
| Sell (main page) | 🥗 Garden Salad Code 409 · has options RM 15. (x8) | Pop-up: 🥗 Garden Salad | Pass |
| Sell (main page) | Dine-in / Takeaway (x8) | Already selected, stays on Sell (main page) | Pass |
| Sell (main page) | What does SST mean? (x8) | Pop-up: SST | Pass |
| Sell (main page) | Held bills (0) / Held bills (1) (x8) | Pop-up: Held bills | Pass |
| Sell (main page) | What does Service charge mean? (x2) | Pop-up: Service charge | Pass |
| Sell (main page) | What does Rounding mean? (x4) | Pop-up: Rounding | Pass |
| Sell (main page) | Clear bill (x4) | Pop-up: Clear this bill? | Pass |
| Sell (main page) | Back (x1) | Home (main page) | Pass |
| Sell (main page) | Next / Go to payment · RM 14.85 (x3) | Payment | Pass |
| Settings (main page) | Business details Name, address, TIN and regis (x1) | Business details | Pass |
| Settings (main page) | Tax, service charge and rounding The percenta (x1) | Tax and rounding | Pass |
| Settings (main page) | Menu and recipes Add, change or delete dishes (x1) | Menu and recipes | Pass |
| Settings (main page) | Alerts When to warn about food that is close  (x1) | Alerts | Pass |
| Settings (main page) | E-invoice notes The LHDN rules this demo foll (x1) | E-invoice ... | Pass |
| Settings (main page) | Limitations What is pretend in this demo and  (x1) | Limitations | Pass |
| Settings (main page) | Language · Bahasa · 语言 English, Bahasa Melayu (x1) | Language | Pass |
| Settings (main page) | Reset demo data (x1) | Pop-up: Reset all demo data? | Pass |
| Stock (main page) | Count stock (x4) | Count stock | Pass |
| Stock (main page) | Add item (x4) | Add item | Pass |
| Stock (main page) | All items (60) / Low (4) / Expiring soon (6) (x9) | Stock (main page) | Pass |
| Stock (main page) | What does Minimum stock mean? (x3) | Pop-up: Minimum stock | Pass |
| Stock (main page) | Fresh milk 5 L 12 L In 4 days 11 Oct Lembah F (x3) | Fresh milk | Pass |
| Stock (main page) | Oat milk 10.22 L 4 L In 58 days 4 Dec Lembah  (x2) | Oat milk | Pass |
| Stock (main page) | Whipping cream 2.92 L 2 L In 7 days 14 Oct Le (x2) | Whipping cream | Pass |
| Stock (main page) | Butter 3.52 kg 2 kg In 44 days 20 Nov Lembah  (x2) | Butter | Pass |
| Stock (main page) | Cheddar slices 3.55 kg 1.5 kg In 30 days 6 No (x2) | Cheddar slices | Pass |
| Stock (main page) | Mozzarella 3.21 kg 1.5 kg In 21 days 28 Oct L (x2) | Mozzarella | Pass |
| Stock (main page) | Yogurt 3.34 kg 2 kg In 7 days 14 Oct Lembah F (x2) | Yogurt | Pass |
| Stock (main page) | Eggs 119.5 pieces 60 pieces In 19 days 26 Oct (x2) | Eggs | Pass |
| Stock (main page) | Cream cheese 1.68 kg 1 kg In 25 days 1 Nov Le (x2) | Cream cheese | Pass |
| Stock (main page) | Lettuce 4.2 kg 2 kg Tomorrow 8 Oct Pasar Pagi / Lettuce (x3) | Lettuce | Pass |
| Stock (main page) | Tomato 5.22 kg 3 kg In 4 days 11 Oct Pasar Pa (x2) | Tomato | Pass |
| Stock (main page) | Cucumber 4.53 kg 2 kg In 4 days 11 Oct Pasar  (x2) | Cucumber | Pass |
| Stock (main page) | Onion 5.88 kg 3 kg In 30 days 6 Nov Pasar Pag (x2) | Onion | Pass |
| Stock (main page) | Garlic 2.15 kg 1 kg In 43 days 19 Nov Pasar P (x2) | Garlic | Pass |
| Stock (main page) | Chilli 1.2 kg 0.5 kg In 8 days 15 Oct Pasar P (x2) | Chilli | Pass |
| Stock (main page) | Lemon 29.46 pieces 15 pieces In 8 days 15 Oct (x2) | Lemon | Pass |
| Stock (main page) | Limau kasturi 1.88 kg 1 kg In 3 days 10 Oct P (x2) | Limau kasturi | Pass |
| Stock (main page) | Banana 6.79 kg 3 kg In 3 days 10 Oct Pasar Pa (x2) | Banana | Pass |
| Stock (main page) | Avocado 6 pieces 10 pieces In 3 days 10 Oct P (x3) | Avocado | Pass |
| Stock (main page) | Mushrooms 2.18 kg 1.5 kg In 3 days 10 Oct Pas (x2) | Mushrooms | Pass |
| Stock (main page) | Spinach 2.1 kg 1 kg In 2 days 9 Oct Pasar Pag / Spinach (x3) | Spinach | Pass |
| Stock (main page) | Potato 12.21 kg 5 kg In 26 days 2 Nov Pasar P (x2) | Potato | Pass |
| Stock (main page) | Mixed berries (frozen) 3.67 kg 2 kg In 175 da (x2) | Mixed berries (frozen) | Pass |
| Stock (main page) | Mango 4.89 kg 2 kg In 3 days 10 Oct Pasar Pag (x2) | Mango | Pass |
| Stock (main page) | Sourdough loaf 12.8 loaves 6 loaves Tomorrow  / Sourdough loaf (x3) | Sourdough loaf | Pass |
| Stock (main page) | Croissant (frozen dough) 14 pieces 30 pieces  (x3) | Croissant (frozen dough) | Pass |
| Stock (main page) | Burger bun 39.93 pieces 20 pieces In 3 days 1 (x2) | Burger bun | Pass |
| Stock (main page) | Bagel 28.42 pieces 12 pieces In 3 days 10 Oct (x2) | Bagel | Pass |
| Stock (main page) | Tortilla wrap 32.95 pieces 20 pieces In 10 da (x2) | Tortilla wrap | Pass |
| Stock (main page) | Flour 11.69 kg 8 kg In 175 days 31 Mar Roti R (x2) | Flour | Pass |
| Stock (main page) | Sugar 11.14 kg 5 kg In 363 days 5 Oct Roti Ru (x2) | Sugar | Pass |
| Stock (main page) | Cocoa powder 2.44 kg 1 kg In 361 days 3 Oct R (x2) | Cocoa powder | Pass |
| Stock (main page) | Dark chocolate 2.22 kg 1.5 kg In 297 days 31  (x2) | Dark chocolate | Pass |
| Stock (main page) | Almond flakes 1.12 kg 0.5 kg In 179 days 4 Ap (x2) | Almond flakes | Pass |
| Stock (main page) | Coffee beans 2.5 kg 4 kg In 23 days 30 Oct Bi (x3) | Coffee beans | Pass |
| Stock (main page) | Matcha powder 0.58 kg 0.3 kg In 179 days 4 Ap (x2) | Matcha powder | Pass |
| Stock (main page) | Tea leaves 1.02 kg 0.5 kg In 360 days 2 Oct B (x2) | Tea leaves | Pass |
| Stock (main page) | Vanilla syrup 1.94 L 1 L In 360 days 2 Oct Bi (x2) | Vanilla syrup | Pass |
| Stock (main page) | Caramel sauce 1.58 L 1 L In 360 days 2 Oct Bi (x2) | Caramel sauce | Pass |
| Stock (main page) | Honey 1.87 kg 1 kg In 365 days 7 Oct Biji Hit (x2) | Honey | Pass |
| Stock (main page) | Gula melaka 1.75 kg 1 kg In 179 days 4 Apr Bi (x2) | Gula melaka | Pass |
| Stock (main page) | Soda water 25.47 L 10 L In 179 days 4 Apr Bij (x2) | Soda water | Pass |
| Stock (main page) | Orange juice 6.78 L 4 L In 4 days 11 Oct Biji (x2) | Orange juice | Pass |
| Stock (main page) | Rice 25.35 kg 10 kg In 364 days 6 Oct Kedai K (x2) | Rice | Pass |
| Stock (main page) | Pasta 8.29 kg 4 kg In 361 days 3 Oct Kedai Ke (x2) | Pasta | Pass |
| Stock (main page) | Coconut milk 6.81 L 3 L In 176 days 1 Apr Ked (x2) | Coconut milk | Pass |
| Stock (main page) | Cooking oil 11.36 L 5 L In 362 days 4 Oct Ked (x2) | Cooking oil | Pass |
| Stock (main page) | Olive oil 1.57 L 1 L In 362 days 4 Oct Kedai  (x2) | Olive oil | Pass |
| Stock (main page) | Sambal paste 3.31 kg 2 kg In 58 days 4 Dec Ke (x2) | Sambal paste | Pass |
| Stock (main page) | Ikan bilis 1.73 kg 1 kg In 117 days 1 Feb Ked (x2) | Ikan bilis | Pass |
| Stock (main page) | Peanuts 1.91 kg 1 kg In 117 days 1 Feb Kedai  (x2) | Peanuts | Pass |
| Stock (main page) | Tomato pasta sauce 7.49 kg 3 kg In 235 days 3 (x2) | Tomato pasta sauce | Pass |
| Stock (main page) | Mayonnaise 2.46 kg 1.5 kg In 119 days 3 Feb K (x2) | Mayonnaise | Pass |
| Stock (main page) | Chicken breast 10 kg 5 kg Tomorrow 8 Oct Ayam / Chicken breast (x3) | Chicken breast | Pass |
| Stock (main page) | Beef patty 47.77 pieces 20 pieces In 3 days 1 (x2) | Beef patty | Pass |
| Stock (main page) | Smoked salmon 2.24 kg 1 kg In 5 days 12 Oct A (x2) | Smoked salmon | Pass |
| Stock (main page) | Tuna (canned) 3.36 kg 1.5 kg In 363 days 5 Oc (x2) | Tuna (canned) | Pass |
| Stock (main page) | Prawns 3.15 kg 1.5 kg In 2 days 9 Oct Ayam &  / Prawns (x4) | Prawns | Pass |
| Stock (main page) | Turkey ham 1.84 kg 1 kg In 7 days 14 Oct Ayam (x2) | Turkey ham | Pass |
| Stock (main page) | Chicken sausage 34.36 pieces 20 pieces In 11  (x2) | Chicken sausage | Pass |
| Stock (main page) | Expiring soon (6) / Low (4) / All items (60) (x3) | Already selected, stays on Stock (main page) | Pass |
| Stock (main page) | Offer for rescue (x1) | Pop-up: Offer Lettuce for rescue | Pass |
| Stock (main page) | Log as waste (x6) | Pop-up: Log this batch as waste? | Pass |
| Stock (main page) | Offer for rescue (x1) | Pop-up: Offer Sourdough loaf for rescue | Pass |
| Stock (main page) | Offer for rescue (x1) | Pop-up: Offer Chicken breast for rescue | Pass |
| Stock (main page) | Offer for rescue (x1) | Pop-up: Offer Spinach for rescue | Pass |
| Stock (main page) | Offer for rescue (x2) | Pop-up: Offer Prawns for rescue | Pass |
| Tax and rounding | Add a service charge to dine-in bills / Also add it to takeaway bills / Charge SST (only if the outlet is registered  and 2 more (x5) | Tax and rounding | Pass |
| Tax and rounding | What does Service charge mean? (x2) | Pop-up: Service charge | Pass |
| Tax and rounding | What does SST mean? (x2) | Pop-up: SST | Pass |
| Tax and rounding | What does Rounding mean? (x2) | Pop-up: Rounding | Pass |
| Waste (main page) | See the monthly report / Next (x11) | Reports (main page) | Pass |
| Waste (main page) | Waste log / Food Rescue / Expired and 10 more (x75) | Waste (main page) | Pass |
| Waste (main page) | Today, 7:38 pm Mushrooms 0.6 kg Expired Added / Today, 7:38 pm Banana 1.5 kg Expired Added au / 4 Oct, 3:30 pm Chicken sausage 1 piece Overpr and 55 more (x400) | Waste history: ... | Pass |
| Waste (main page) | Waste log / Food Rescue / Expired (x14) | Already selected, stays on Waste (main page) | Pass |
| Waste (main page) | What does Food Rescue mean? (x5) | Pop-up: Food Rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Lettuce for rescue | Pass |
| Waste (main page) | Offer for rescue (x10) | Pop-up: Offer Sourdough loaf for rescue | Pass |
| Waste (main page) | Offer for rescue (x10) | Pop-up: Offer Chicken breast for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Spinach for rescue | Pass |
| Waste (main page) | Offer for rescue (x10) | Pop-up: Offer Prawns for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Limau kasturi for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Banana for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Avocado for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Mushrooms for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Mango for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Burger bun for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Bagel for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Beef patty for rescue | Pass |
| Waste (main page) | Back to Home (x2) | Home (main page) | Pass |
| Waste (main page) | Back (x1) | Receive goods | Pass |
| Waste entries, October # | Copy as spreadsheet (x1) | Pop-up: Waste log for October # | Pass |
| Waste entries, October # | 7 Oct Mushrooms 0.6 kg Expired 0.6 kg RM 10.8 / 7 Oct Banana 1.5 kg Expired 1.5 kg RM 8.25 Hi / 4 Oct Chicken sausage 1 piece Overproduced 0. and 4 more (x7) | Waste history: ... | Pass |
| Waste history: ... | Open this item in Stock (x1) | Mushrooms | Pass |
| Waste history: ... | Remove entry (x1) | Pop-up: Remove this waste entry? | Pass |
| Welcome tour step | Skip the tour / Finish (x6) | Home (main page) | Pass |
| Welcome tour step | Next / Back (x8) | Welcome tour step | Pass |

### Started as Cashier

| Screen | Button | Where it leads | Result |
|---|---|---|---|
|  Every screen (menu and top bar) | Home / Sell / Stock and 4 more (x14) | Already on that page, stays there | Pass |
|  Every screen (menu and top bar) | Sell (x97) | Sell (main page) | Pass |
|  Every screen (menu and top bar) | Help / Tours Replay the welcome tour, or start the s (x259) | Pop-up: Help for that page | Pass |
|  Every screen (menu and top bar) | Viewing as: Cashier ▾ / Viewing as: Kitchen ▾ / Viewing as: Owner ▾ (x128) | Pop-up: Who is using the app? | Pass |
|  Every screen (menu and top bar) | Demo tour / Home (x257) | Home (main page) | Pass |
|  Every screen (menu and top bar) | Back / Cancel / Back to the bill and 17 more (x299) | The page before | Pass |
|  Every screen (menu and top bar) | Stock (x36) | Stock (main page) | Pass |
|  Every screen (menu and top bar) | Orders (x36) | Orders (main page) | Pass |
|  Every screen (menu and top bar) | Waste (x36) | Waste (main page) | Pass |
|  Every screen (menu and top bar) | Invoices 4 (x13) | Invoices (main page) | Pass |
|  Every screen (menu and top bar) | Settings (x12) | Settings (main page) | Pass |
|  Every screen (menu and top bar) | Viewing as: Kitchen ▾ (x1) | Pop-up: Who is using the app? ) | Pass |
|  Every screen (menu and top bar) | Reports (x12) | Reports (main page) | Pass |
| Add item | What does Minimum stock mean? (x2) | Pop-up: Minimum stock | Pass |
| Add item | Save item / Fix it (x5) | Add item | Pass |
| Alerts | 1 day / 2 days / 3 days and 2 more (x5) | Alerts | Pass |
| Bill ... | Mark as not paid / Mark as paid / Mark e-invoice as received (x6) | Bill ... | Pass |
| Bill ... | Open order #101 / Open order #103 / Open order #105 (x4) | Order ... | Pass |
| Bill ... | What does E-invoice mean? (x4) | Pop-up: E-invoice | Pass |
| Bill ... | What does Unique ID mean? (x2) | Pop-up: Unique ID | Pass |
| Business details | What does TIN mean? (x1) | Pop-up: TIN | Pass |
| Business details | What does Business registration number mean? (x1) | Pop-up: Business registration number | Pass |
| Business details | What does SST mean? (x1) | Pop-up: SST | Pass |
| Business details | What does Business activity code mean? (x1) | Pop-up: Business activity code | Pass |
| CN-# | Printable view (x1) | Printable view | Pass |
| CN-# | Show JSON (x1) | Pop-up: E-invoice CN-# as JSON (simplified UBL #.# layout) | Pass |
| CN-# | Cancel this e-invoice (x1) | Pop-up: Cancel e-invoice CN-#? | Pass |
| CN-# | Open receipt 14643 (x2) | Receipt ... | Pass |
| CN-# | What does Unique ID mean? (x2) | Pop-up: Unique ID | Pass |
| CN-# | What does TIN mean? (x2) | Pop-up: TIN | Pass |
| CN-# | What does Business registration number mean? (x2) | Pop-up: Business registration number | Pass |
| CN-# | What does Business activity code mean? (x2) | Pop-up: Business activity code | Pass |
| CN-# | What does Classification code mean? (x2) | Pop-up: Classification code | Pass |
| CN-# | What does Tax type mean? (x2) | Pop-up: Tax type | Pass |
| Combined e-invoice ... | What does Combined e-invoice mean? (x1) | Pop-up: Combined e-invoice | Pass |
| Combined e-invoice ... | September 2026 / October 2026 / Save and go to Check items and 4 more (x7) | Combined e-invoice ... | Pass |
| Combined e-invoice ... | Save draft and close / New sale (x2) | Sell (main page) | Pass |
| Combined e-invoice ... | What does Classification code mean? (x2) | Pop-up: Classification code | Pass |
| Combined e-invoice ... | What does Tax type mean? (x2) | Pop-up: Tax type | Pass |
| Combined e-invoice ... | What does TIN mean? (x1) | Pop-up: TIN | Pass |
| Combined e-invoice ... | What does Business registration number mean? (x1) | Pop-up: Business registration number | Pass |
| Combined e-invoice ... | What does Business activity code mean? (x1) | Pop-up: Business activity code | Pass |
| Combined e-invoice ... | Open the e-invoice (x1) | EINV-# | Pass |
| Count saved | Back to Stock (x1) | Stock (main page) | Pass |
| Count saved | Back to Home (x1) | Home (main page) | Pass |
| Count stock | Dairy / Produce / Bakery and 3 more (x6) | Count stock | Pass |
| Count stock | Save count (x1) | Count saved | Pass |
| Credit note ... | What does Credit note mean? (x4) | Pop-up: Credit note | Pass |
| Credit note ... | Wrong items or amounts / Customer returned the order / Wrong buyer details and 6 more (x19) | Credit note ... | Pass |
| Credit note ... | Save draft and close / New sale (x5) | Sell (main page) | Pass |
| Credit note ... | Wrong items or amounts (x2) | Already selected, stays on Credit note CN-# | Pass |
| Credit note ... | What does Classification code mean? (x2) | Pop-up: Classification code | Pass |
| Credit note ... | What does Tax type mean? (x2) | Pop-up: Tax type | Pass |
| Credit note ... | What does TIN mean? (x1) | Pop-up: TIN | Pass |
| Credit note ... | What does Business registration number mean? (x1) | Pop-up: Business registration number | Pass |
| Credit note ... | What does Business activity code mean? (x1) | Pop-up: Business activity code | Pass |
| Credit note ... | Open the e-invoice (x1) | CN-# | Pass |
| E-invoice ... | See the full limitations list (x1) | Limitations | Pass |
| E-invoice ... | Syarikat Contoh Maju Sdn Bhd (demo company) / Aina Demo (demo individual) / Buyer with a wrong TIN (shows a rejection) and 10 more (x37) | E-invoice ... | Pass |
| E-invoice ... | A business (x4) | Already selected, stays on E-invoice EINV-# | Pass |
| E-invoice ... | What does TIN mean? (x5) | Pop-up: TIN | Pass |
| E-invoice ... | What does Business registration number mean? (x5) | Pop-up: Business registration number | Pass |
| E-invoice ... | What does SST mean? (x4) | Pop-up: SST | Pass |
| E-invoice ... | Save draft and close / New sale (x5) | Sell (main page) | Pass |
| E-invoice ... | What does Classification code mean? (x2) | Pop-up: Classification code | Pass |
| E-invoice ... | What does Tax type mean? (x2) | Pop-up: Tax type | Pass |
| E-invoice ... | What does Business activity code mean? (x1) | Pop-up: Business activity code | Pass |
| E-invoice ... | Open the e-invoice / Next / Back (x3) | EINV-# | Pass |
| E-invoice ... | Back (x1) | Reports (main page) | Pass |
| EINV-# | Issue a new e-invoice for this sale / Continue this e-invoice / Fix and send again and 2 more (x5) | E-invoice ... | Pass |
| EINV-# | Open receipt 14520 / Open receipt 14585 / Open receipt 14643 / Open receipt 14514 (x5) | Receipt ... | Pass |
| EINV-# | What does Unique ID mean? (x5) | Pop-up: Unique ID | Pass |
| EINV-# | What does TIN mean? (x7) | Pop-up: TIN | Pass |
| EINV-# | What does Business registration number mean? (x7) | Pop-up: Business registration number | Pass |
| EINV-# | What does Business activity code mean? (x7) | Pop-up: Business activity code | Pass |
| EINV-# | What does Classification code mean? (x7) | Pop-up: Classification code | Pass |
| EINV-# | What does Tax type mean? (x7) | Pop-up: Tax type | Pass |
| EINV-# | Printable view (x3) | Printable view | Pass |
| EINV-# | Show JSON (x3) | Pop-up: E-invoice EINV-# as JSON (simplified UBL #.# layout) | Pass |
| EINV-# | Issue credit note (x3) | Credit note ... | Pass |
| EINV-# | Cancel this e-invoice (x2) | Pop-up: Cancel e-invoice EINV-#? | Pass |
| EINV-# | Delete draft (x1) | Pop-up: Delete this draft? | Pass |
| EINV-# | End tour (x1) | EINV-# | Pass |
| Enter supplier bill | What does E-invoice mean? (x2) | Pop-up: E-invoice | Pass |
| Enter supplier bill | Save bill / Fix it (x4) | Enter supplier bill | Pass |
| Espresso | Picture ☕ (x2) | Already selected, stays on Espresso | Pass |
| Espresso | Picture 🧊 / Picture 🍵 / Picture 🥤 and 32 more (x69) | Espresso | Pass |
| Espresso | What does Food cost % mean? (x2) | Pop-up: Food cost % | Pass |
| Espresso | Delete dish (x2) | Pop-up: Delete Espresso? | Pass |
| Espresso | Save dish (x2) | Menu and recipes | Pass |
| Fresh milk | End tour (x1) | Fresh milk | Pass |
| Fresh milk | Back (x1) | Sale done | Pass |
| Fresh milk | Next / Order more (x2) | New order | Pass |
| Fresh milk | Log waste (x1) | Waste (main page) | Pass |
| Fresh milk | Fix the count (x1) | Pop-up: Fix the count: Fresh milk | Pass |
| Fresh milk | Edit item (x1) | Pop-up: Edit Fresh milk | Pass |
| Fresh milk | What does Use oldest first mean? (x1) | Pop-up: Use oldest first | Pass |
| Fresh milk | Log as waste (x1) | Pop-up: Log this batch as waste? | Pass |
| Fresh milk | See all waste for this item (x1) | Waste history: ... | Pass |
| Goods received | Back to Home (x1) | Home (main page) | Pass |
| Goods received | Enter the supplier bill (x1) | Enter supplier bill | Pass |
| Goods received | See stock (x1) | Stock (main page) | Pass |
| Home (main page) | New sale / Next (x2) | Sell (main page) | Pass |
| Home (main page) | See today's sales (x1) | Recent sales | Pass |
| Home (main page) | 3 sales have no e-invoice yet The customer as (x1) | Invoices | Pass |
| Home (main page) | End tour (x1) | Home (main page) | Pass |
| Invoices | What does E-invoice mean? (x7) | Pop-up: E-invoice | Pass |
| Invoices | Issue e-invoice (x7) | Pick the sale | Pass |
| Invoices | E-invoice notes / 14716 7 Oct 2026, 6:06 pm RM 35.00 Issue e-in / 14647 7 Oct 2026, 8:19 am RM 8.50 Issue e-inv / 14645 6 Oct 2026, 7:02 pm RM 39.65 Issue e-in (x10) | E-invoice ... | Pass |
| Invoices | Combined e-invoice for September 2026 walk-in (x7) | Combined e-invoice ... | Pass |
| Invoices | All (4) / Drafts (0) / Valid (2) and 5 more (x43) | Invoices | Pass |
| Invoices | Waiting (3) / All (4) / Drafts (0) and 4 more (x7) | Already selected, stays on Invoices | Pass |
| Invoices | EINV-26-00004 E-invoice Aina Binti Demo (DEMO / EINV-26-00003 E-invoice Kedai Ujian Enterpris / EINV-26-00002 E-invoice Aina Binti Demo (DEMO / EINV-26-00001 E-invoice Syarikat Contoh Maju  (x8) | EINV-# | Pass |
| Invoices | INV-D-2101 Lembah Fresh Dairy Sdn Bhd (demo)  / INV-C-2102 Biji Hitam Coffee Roasters (demo)  / INV-K-2103 Kedai Kering Dry Goods (demo) RM 2 and 2 more (x5) | Bill ... | Pass |
| Invoices (main page) | What does E-invoice mean? (x1) | Pop-up: E-invoice | Pass |
| Invoices (main page) | Issue e-invoice (x1) | Pick the sale | Pass |
| Invoices (main page) | E-invoice notes (x1) | E-invoice ... | Pass |
| Invoices (main page) | All (5) / Waiting (3) / Drafts (0) and 4 more (x7) | Invoices (main page) | Pass |
| Invoices (main page) | EINV-26-00005 Combined (walk-in sales) Genera / EINV-26-00004 E-invoice Aina Binti Demo (DEMO / EINV-26-00003 E-invoice Kedai Ujian Enterpris and 2 more (x5) | EINV-# | Pass |
| Language | English / Bahasa Melayu / 中文 (简体) (x3) | Language | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Create order (x1) | New order | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Edit details (x1) | Pop-up: Edit supplier ) | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | What does TIN mean? (x1) | Pop-up: TIN ) | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Fresh milk RM 7.50 / L Open › (x1) | Fresh milk | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Oat milk RM 11.00 / L Open › (x1) | Oat milk | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Whipping cream RM 16.00 / L Open › (x1) | Whipping cream | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Butter RM 38.00 / kg Open › (x1) | Butter | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Cheddar slices RM 42.00 / kg Open › (x1) | Cheddar slices | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Mozzarella RM 36.00 / kg Open › (x1) | Mozzarella | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Yogurt RM 12.00 / kg Open › (x1) | Yogurt | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Eggs RM 0.55 / piece Open › (x1) | Eggs | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Cream cheese RM 34.00 / kg Open › (x1) | Cream cheese | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | #108 28 Sep Cancelled Open › / #101 21 Sep Received Open › (x2) | Order ... | Pass |
| Menu and recipes | Add dish (x1) | New dish | Pass |
| Menu and recipes | 101 ☕ Espresso Coffee RM 8.00 RM 1.40 18% Cha (x1) | Espresso | Pass |
| Menu and recipes | 102 ☕ Americano Coffee RM 9.00 RM 1.40 16% Ch (x1) | Americano | Pass |
| Menu and recipes | 103 ☕ Latte Coffee RM 12.00 RM 2.90 24% Chang (x1) | Latte | Pass |
| Menu and recipes | 104 ☕ Cappuccino Coffee RM 12.00 RM 2.75 23%  (x1) | Cappuccino | Pass |
| Menu and recipes | 105 ☕ Flat White Coffee RM 12.00 RM 2.60 22%  (x1) | Flat White | Pass |
| Menu and recipes | 106 ☕ Mocha Coffee RM 14.00 RM 3.32 24% Chang (x1) | Mocha | Pass |
| Menu and recipes | 107 ☕ Caramel Latte Coffee RM 14.00 RM 3.42 2 (x1) | Caramel Latte | Pass |
| Menu and recipes | 108 ☕ Gula Melaka Latte Coffee RM 14.00 RM 3. (x1) | Gula Melaka Latte | Pass |
| Menu and recipes | 109 🧊 Iced Long Black Coffee RM 10.00 RM 1.4 (x1) | Iced Long Black | Pass |
| Menu and recipes | 201 🍵 Matcha Latte Drinks RM 14.00 RM 2.53 1 (x1) | Matcha Latte | Pass |
| Menu and recipes | 202 🍫 Hot Chocolate Drinks RM 12.00 RM 3.05  (x1) | Hot Chocolate | Pass |
| Menu and recipes | 203 🫖 Teh Tarik Special Drinks RM 7.00 RM 1. (x1) | Teh Tarik Special | Pass |
| Menu and recipes | 204 🍋 Lemon Honey Soda Drinks RM 10.00 RM 1. (x1) | Lemon Honey Soda | Pass |
| Menu and recipes | 205 🥤 Limau Kasturi Cooler Drinks RM 9.00 RM (x1) | Limau Kasturi Cooler | Pass |
| Menu and recipes | 206 🥭 Mango Smoothie Drinks RM 14.00 RM 3.30 (x1) | Mango Smoothie | Pass |
| Menu and recipes | 207 🫐 Berry Smoothie Drinks RM 15.00 RM 6.55 (x1) | Berry Smoothie | Pass |
| Menu and recipes | 208 🍊 Orange Juice Drinks RM 11.00 RM 2.70 2 (x1) | Orange Juice | Pass |
| Menu and recipes | 301 🍳 Big Breakfast Breakfast RM 26.00 RM 7. (x1) | Big Breakfast | Pass |
| Menu and recipes | 302 🥑 Avocado Toast Breakfast RM 19.00 RM 7. (x1) | Avocado Toast | Pass |
| Menu and recipes | 303 🥯 Smoked Salmon Bagel Breakfast RM 24.00 (x1) | Smoked Salmon Bagel | Pass |
| Menu and recipes | 304 🍞 Scrambled Eggs on Toast Breakfast RM 1 (x1) | Scrambled Eggs on Toast | Pass |
| Menu and recipes | 305 🥞 Banana Pancakes Breakfast RM 17.00 RM  (x1) | Banana Pancakes | Pass |
| Menu and recipes | 306 🥣 Berry Yogurt Bowl Breakfast RM 15.00 R (x1) | Berry Yogurt Bowl | Pass |
| Menu and recipes | 307 🍛 Nasi Lemak Ayam Breakfast RM 16.00 RM  (x1) | Nasi Lemak Ayam | Pass |
| Menu and recipes | 401 🍔 Chicken Burger Mains RM 22.00 RM 5.60  (x1) | Chicken Burger | Pass |
| Menu and recipes | 402 🍔 Beef Burger Mains RM 26.00 RM 8.61 33% (x1) | Beef Burger | Pass |
| Menu and recipes | 403 🌯 Chicken Caesar Wrap Mains RM 19.00 RM  (x1) | Chicken Caesar Wrap | Pass |
| Menu and recipes | 404 🥪 Tuna Melt Sandwich Mains RM 18.00 RM 5 (x1) | Tuna Melt Sandwich | Pass |
| Menu and recipes | 405 🍝 Mushroom Aglio Olio Mains RM 20.00 RM  (x1) | Mushroom Aglio Olio | Pass |
| Menu and recipes | 406 🍝 Prawn Aglio Olio Mains RM 26.00 RM 5.9 (x1) | Prawn Aglio Olio | Pass |
| Menu and recipes | 407 🍝 Tomato Chicken Pasta Mains RM 22.00 RM (x1) | Tomato Chicken Pasta | Pass |
| Menu and recipes | 408 🍚 Nasi Goreng Kampung Mains RM 16.00 RM  (x1) | Nasi Goreng Kampung | Pass |
| Menu and recipes | 409 🥗 Garden Salad Mains RM 15.00 RM 4.90 33 (x1) | Garden Salad | Pass |
| Menu and recipes | 410 🥐 Turkey Ham Cheese Croissant Mains RM 1 (x1) | Turkey Ham Cheese Croissant | Pass |
| Menu and recipes | 411 🍟 Fries Mains RM 9.00 RM 0.97 11% Change (x1) | Fries | Pass |
| Menu and recipes | 501 🥐 Butter Croissant Bakery RM 8.00 RM 2.3 (x1) | Butter Croissant | Pass |
| Menu and recipes | 502 🥐 Almond Croissant Bakery RM 11.00 RM 3. (x1) | Almond Croissant | Pass |
| Menu and recipes | 503 🍫 Chocolate Brownie Bakery RM 10.00 RM 3 (x1) | Chocolate Brownie | Pass |
| Menu and recipes | 504 🍌 Banana Bread Slice Bakery RM 8.00 RM 1 (x1) | Banana Bread Slice | Pass |
| Menu and recipes | 505 🍰 Burnt Cheesecake Slice Bakery RM 15.00 (x1) | Burnt Cheesecake Slice | Pass |
| Menu and recipes | 506 🧁 Berry Muffin Bakery RM 8.00 RM 2.34 29 (x1) | Berry Muffin | Pass |
| Menu and recipes | 507 🍰 Gula Melaka Cake Slice Bakery RM 12.00 (x1) | Gula Melaka Cake Slice | Pass |
| Menu and recipes | 508 🥯 Bagel with Cream Cheese Bakery RM 10.0 (x1) | Bagel with Cream Cheese | Pass |
| Menu and recipes | 509 🍞 Garlic Toast Bakery RM 7.00 RM 1.52 22 (x1) | Garlic Toast | Pass |
| New dish | Picture ☕ / Picture 🧊 / Picture 🍵 and 33 more (x72) | New dish | Pass |
| New dish | Picture 🍽️ (x2) | Already selected, stays on New dish | Pass |
| New dish | What does Food cost % mean? (x2) | Pop-up: Food cost % | Pass |
| New order | End tour / Less Fresh milk / More Fresh milk and 27 more (x37) | New order | Pass |
| New order | Back (x1) | Fresh milk | Pass |
| New order | Next (x1) | Receive goods | Pass |
| New order | Send order to Lembah Fresh Dairy Sdn Bhd (x1) | Order ... | Pass |
| Order ... | Open the supplier bill (x1) | Bill ... | Pass |
| Order ... | Fresh milk 30 L 30 L All in RM 7.50 RM 225.00 / Fresh milk 36 L 0 L RM 7.50 RM 270.00 (x2) | Fresh milk | Pass |
| Order ... | Butter 3 kg 3 kg All in RM 38.00 RM 114.00 (x1) | Butter | Pass |
| Order ... | Eggs 120 pieces 120 pieces All in RM 0.55 RM  (x1) | Eggs | Pass |
| Order ... | Yogurt 4 kg 4 kg All in RM 12.00 RM 48.00 (x1) | Yogurt | Pass |
| Order ... | Back to Orders (x1) | Orders (main page) | Pass |
| Order ... | Back to Home (x1) | Home (main page) | Pass |
| Order ... | Open this order (x1) | Order ... | Pass |
| Order ... | Receive goods (x2) | Receive goods | Pass |
| Order ... | Cancel order (x1) | Pop-up: Cancel order #? | Pass |
| Order ... | Order from this supplier again (x1) | New order | Pass |
| Order ... | Whipping cream 4 L 0 L RM 16.00 RM 64.00 (x1) | Whipping cream | Pass |
| Order ... | Close order (the rest is not coming) (x1) | Pop-up: Close order #? | Pass |
| Order ... | Sourdough loaf 12 loaves 6 loaves Part RM 9.0 (x1) | Sourdough loaf | Pass |
| Order ... | Burger bun 40 pieces 20 pieces Part RM 1.10 R (x1) | Burger bun | Pass |
| Order ... | Bagel 24 pieces 12 pieces Part RM 2.00 RM 48. (x1) | Bagel | Pass |
| Orders (main page) | Create order / Turn into an order (1 item) (x7) | New order | Pass |
| Orders (main page) | Receive delivery (x3) | Receive goods | Pass |
| Orders (main page) | Orders (8) / Suggested (4) / Suppliers (6) / Supplier bills (5) (x16) | Orders (main page) | Pass |
| Orders (main page) | #108 Lembah Fresh Dairy Sdn Bhd (demo) 28 Sep / #107 Pasar Pagi Produce (demo) 6 Oct 7 Oct RM / #106 Roti Rumah Bakery Supply (demo) 5 Oct 7  and 5 more (x16) | Order ... | Pass |
| Orders (main page) | Orders (8) / Suggested (4) / Suppliers (6) / Supplier bills (5) (x4) | Already selected, stays on Orders (main page) | Pass |
| Orders (main page) | Add supplier (x1) | Pop-up: Add supplier | Pass |
| Orders (main page) | Lembah Fresh Dairy Sdn Bhd (demo) 03-5550 010 (x1) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Orders (main page) | Pasar Pagi Produce (demo) 03-5550 0102 1 day  (x1) | Pasar Pagi Produce (demo) | Pass |
| Orders (main page) | Roti Rumah Bakery Supply (demo) 03-5550 0103  (x1) | Roti Rumah Bakery Supply (demo) | Pass |
| Orders (main page) | Biji Hitam Coffee Roasters (demo) 03-5550 010 (x1) | Biji Hitam Coffee Roasters (demo) | Pass |
| Orders (main page) | Kedai Kering Dry Goods (demo) 03-5550 0105 2  (x1) | Kedai Kering Dry Goods (demo) | Pass |
| Orders (main page) | Ayam & Laut Fresh Proteins (demo) 03-5550 010 (x1) | Ayam & Laut Fresh Proteins (demo) | Pass |
| Orders (main page) | Enter supplier bill (x1) | Enter supplier bill | Pass |
| Orders (main page) | What does E-invoice mean? (x1) | Pop-up: E-invoice | Pass |
| Orders (main page) | INV-P-2105 Pasar Pagi Produce (demo) 4 Oct 17 / INV-M-2104 Ayam & Laut Fresh Proteins (demo)  / INV-K-2103 Kedai Kering Dry Goods (demo) 27 S and 2 more (x5) | Bill ... | Pass |
| Payment | End tour / Card / DuitNow QR and 9 more (x34) | Payment | Pass |
| Payment | Back (x1) | Sell (main page) | Pass |
| Payment | Next / Confirm payment of RM 24.50 / Confirm payment of RM 14.85 (x8) | Sale done | Pass |
| Payment | Cash / RM 30.00 / Card and 2 more (x9) | Already selected, stays on Payment | Pass |
| Payment | What does SST mean? (x8) | Pop-up: SST | Pass |
| Payment | What does Rounding mean? (x8) | Pop-up: Rounding | Pass |
| Payment | What does Service charge mean? (x4) | Pop-up: Service charge | Pass |
| Pick the sale | 14716 Waiting 7 Oct 2026, 6:06 pm Takeaway RM / 14715 7 Oct 2026, 6:40 pm Takeaway RM 15.90 P / 14714 7 Oct 2026, 6:17 pm Takeaway RM 59.35 P and 57 more (x60) | E-invoice ... | Pass |
| Pop-up: Add supplier | Close / Cancel (x4) | Orders (main page) | Pass |
| Pop-up: Add supplier | Save supplier (x2) | Pop-up: Add supplier | Pass |
| Pop-up: Cancel e-invoice CN-#? | Close / No, keep it / Yes, cancel this e-invoice (x5) | CN-# | Pass |
| Pop-up: Cancel e-invoice CN-#? | Wrong buyer details / Wrong items or amounts / Issued by mistake (x5) | Pop-up: Cancel e-invoice CN-#? | Pass |
| Pop-up: Cancel e-invoice CN-#? | Wrong buyer details (x1) | Already selected, stays on Pop-up: Cancel e-invoice CN-#? | Pass |
| Pop-up: Cancel e-invoice EINV-#? | Close / No, keep it / Yes, cancel this e-invoice (x10) | EINV-# | Pass |
| Pop-up: Cancel e-invoice EINV-#? | Wrong buyer details / Wrong items or amounts / Issued by mistake (x10) | Pop-up: Cancel e-invoice EINV-#? | Pass |
| Pop-up: Cancel e-invoice EINV-#? | Wrong buyer details (x2) | Already selected, stays on Pop-up: Cancel e-invoice EINV-#? | Pass |
| Pop-up: Cancel order #? | Close / No, keep it / Yes, cancel the order (x3) | Order ... | Pass |
| Pop-up: Cancel the e-invoice first | Close / Go back (x2) | Receipt ... | Pass |
| Pop-up: Cancel the e-invoice first | Open the e-invoice (x1) | EINV-# | Pass |
| Pop-up: Clear this bill? | Close / No, keep it / Yes, clear the bill (x12) | Sell (main page) | Pass |
| Pop-up: Close order #? | Close / No, go back / Yes, close the order (x3) | Order ... | Pass |
| Pop-up: Combined e-invoice | Close / Got it (x2) | Combined e-invoice ... | Pass |
| Pop-up: Daily sales for October # | Close (x6) | Sales by day, October # | Pass |
| Pop-up: Daily sales for October # | Download file / Copy all (x6) | Pop-up: Daily sales for October # | Pass |
| Pop-up: Delete Espresso? | Close / No, keep it (x4) | Espresso | Pass |
| Pop-up: Delete Espresso? | Yes, delete this dish (x2) | Menu and recipes | Pass |
| Pop-up: Delete this draft? | Close / No, keep it (x2) | EINV-# | Pass |
| Pop-up: Delete this draft? | Yes, delete the draft (x1) | Invoices (main page) | Pass |
| Pop-up: E-invoice | Close / Got it (x2) | Invoices | Pass |
| Pop-up: E-invoice | Close / Got it (x2) | Bill ... | Pass |
| Pop-up: E-invoice | Close / Got it (x2) | Orders (main page) | Pass |
| Pop-up: E-invoice | Close / Got it (x2) | Enter supplier bill | Pass |
| Pop-up: E-invoice CN-# as JSON (simplified UBL #.# layout) | Close (x6) | CN-# | Pass |
| Pop-up: E-invoice CN-# as JSON (simplified UBL #.# layout) | Download file / Copy all (x6) | Pop-up: E-invoice CN-# as JSON (simplified UBL #.# layout) | Pass |
| Pop-up: E-invoice EINV-# as JSON (simplified UBL #.# layout) | Close (x18) | EINV-# | Pass |
| Pop-up: E-invoice EINV-# as JSON (simplified UBL #.# layout) | Download file / Copy all (x18) | Pop-up: E-invoice EINV-# as JSON (simplified UBL #.# layout) | Pass |
| Pop-up: Edit Fresh milk | Close / Cancel / Save changes (x3) | Fresh milk | Pass |
| Pop-up: Edit Fresh milk | What does Minimum stock mean? (x1) | Pop-up: Minimum stock | Pass |
| Pop-up: Edit supplier ) | Close / Cancel / Save supplier (x3) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Pop-up: Fix the count: Fresh milk | Close / Cancel / Save the new count (x3) | Fresh milk | Pass |
| Pop-up: Food Rescue | Close / Got it (x2) | Waste (main page) | Pass |
| Pop-up: Food cost % | Close / Got it (x2) | Reports (main page) | Pass |
| Pop-up: Food cost % | Close / Got it (x2) | New dish | Pass |
| Pop-up: Held bills | Close / Back to the till / Table ? · RM 16.30 1 item · held at 7:42 pm B and 2 more (x16) | Sell (main page) | Pass |
| Pop-up: Help: Add item | Close / Close help / English and 2 more (x5) | Add item | Pass |
| Pop-up: Help: Add item | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Add item | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Alerts | Close / Close help / English and 2 more (x5) | Alerts | Pass |
| Pop-up: Help: Alerts | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Alerts | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Alerts | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Bill INV-D-# | Close / Close help / English and 2 more (x5) | Bill ... | Pass |
| Pop-up: Help: Bill INV-D-# | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Bill INV-D-# | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Business details | Close / Close help / English and 2 more (x5) | Business details | Pass |
| Pop-up: Help: Business details | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Business details | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Business details | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Combined e-invoice EINV-# | Close / Close help / English and 2 more (x5) | Combined e-invoice ... | Pass |
| Pop-up: Help: Combined e-invoice EINV-# | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Combined e-invoice EINV-# | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Count saved | Close / Close help / English and 2 more (x5) | Count saved | Pass |
| Pop-up: Help: Count saved | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Count saved | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Count stock | Close / Close help / English and 2 more (x5) | Count stock | Pass |
| Pop-up: Help: Count stock | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Count stock | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: E-invoice notes | Close / Close help / English and 2 more (x5) | E-invoice ... | Pass |
| Pop-up: Help: E-invoice notes | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: E-invoice notes | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: EINV-# | Close / Close help / English and 2 more (x5) | EINV-# | Pass |
| Pop-up: Help: EINV-# | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: EINV-# | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Enter supplier bill | Close / Close help / English and 2 more (x5) | Enter supplier bill | Pass |
| Pop-up: Help: Enter supplier bill | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Enter supplier bill | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Fresh milk | Close / Close help / English and 2 more (x5) | Fresh milk | Pass |
| Pop-up: Help: Fresh milk | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Fresh milk | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Goods received | Close / Close help / English and 2 more (x5) | Goods received | Pass |
| Pop-up: Help: Goods received | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Goods received | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Home | Close / Close help / Start the demo tour and 3 more (x6) | Home (main page) | Pass |
| Pop-up: Help: Home | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Invoices | Close / Close help / English and 2 more (x5) | Invoices | Pass |
| Pop-up: Help: Invoices | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Invoices | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Language | Close / Close help / English and 2 more (x5) | Language | Pass |
| Pop-up: Help: Language | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Language | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Language | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Lembah Fresh Dairy Sdn Bhd (demo) ) | Close / Close help / English and 2 more (x5) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Pop-up: Help: Lembah Fresh Dairy Sdn Bhd (demo) ) | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Lembah Fresh Dairy Sdn Bhd (demo) ) | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Limitations | Close / Close help / English and 2 more (x5) | Limitations | Pass |
| Pop-up: Help: Limitations | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Limitations | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Menu and recipes | Close / Close help / English and 2 more (x5) | Menu and recipes | Pass |
| Pop-up: Help: Menu and recipes | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Menu and recipes | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Menu and recipes | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: New dish | Close / Close help / English and 2 more (x5) | New dish | Pass |
| Pop-up: Help: New dish | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: New dish | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: New dish | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: New order | Close / Close help / English and 2 more (x5) | New order | Pass |
| Pop-up: Help: New order | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: New order | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Order # | Close / Close help / English and 2 more (x5) | Order ... | Pass |
| Pop-up: Help: Order # | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Order # | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Order sent | Close / Close help / English and 2 more (x5) | Order ... | Pass |
| Pop-up: Help: Order sent | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Order sent | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Orders | Close / Close help / English and 2 more (x5) | Orders (main page) | Pass |
| Pop-up: Help: Orders | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Orders | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Payment | Close / Close help / English and 2 more (x5) | Payment | Pass |
| Pop-up: Help: Payment | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Payment | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Pick the sale | Close / Close help / English and 2 more (x5) | Pick the sale | Pass |
| Pop-up: Help: Pick the sale | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Pick the sale | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Printable view | Close / Close help / English and 2 more (x5) | Printable view | Pass |
| Pop-up: Help: Printable view | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Printable view | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Receipt # | Close / Close help / English and 2 more (x5) | Receipt ... | Pass |
| Pop-up: Help: Receipt # | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Receipt # | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Receive goods | Close / Close help / English and 2 more (x5) | Receive goods | Pass |
| Pop-up: Help: Receive goods | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Receive goods | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Recent sales | Close / Close help / English and 2 more (x5) | Recent sales | Pass |
| Pop-up: Help: Recent sales | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Recent sales | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Reports | Close / Close help / English and 2 more (x5) | Reports (main page) | Pass |
| Pop-up: Help: Reports | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Reports | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Reports | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Sale done | Close / Close help / English and 2 more (x5) | Sale done | Pass |
| Pop-up: Help: Sale done | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Sale done | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Sales by day, October # | Close / Close help / English and 2 more (x5) | Sales by day, October # | Pass |
| Pop-up: Help: Sales by day, October # | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Sales by day, October # | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Sales by day, October # | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Sell | Close / Close help / English and 2 more (x5) | Sell (main page) | Pass |
| Pop-up: Help: Sell | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Sell | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Settings | Close / Close help / English and 2 more (x5) | Settings (main page) | Pass |
| Pop-up: Help: Settings | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Settings | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Settings | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Stock | Close / Close help / English and 2 more (x5) | Stock (main page) | Pass |
| Pop-up: Help: Stock | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Stock | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Tax and rounding | Close / Close help / English and 2 more (x5) | Tax and rounding | Pass |
| Pop-up: Help: Tax and rounding | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Tax and rounding | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Tax and rounding | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Waste | Close / Close help / English and 2 more (x5) | Waste (main page) | Pass |
| Pop-up: Help: Waste | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Waste | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Waste entries, October # | Close / Close help / English and 2 more (x5) | Waste entries, October # | Pass |
| Pop-up: Help: Waste entries, October # | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Waste entries, October # | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Waste entries, October # | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Waste history: Fresh milk | Close / Close help / English and 2 more (x5) | Waste history: ... | Pass |
| Pop-up: Help: Waste history: Fresh milk | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Waste history: Fresh milk | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: How food cost is worked out | Close / Got it (x2) | Reports (main page) | Pass |
| Pop-up: Ingredients used by receipt # | Close (x2) | Sale done | Pass |
| Pop-up: Log this batch as waste? | Close / No, go back / Yes, log as waste (x3) | Fresh milk | Pass |
| Pop-up: Log this batch as waste? | Close / No, go back / Yes, log as waste (x3) | Stock (main page) | Pass |
| Pop-up: Minimum stock | Close / Got it (x2) | Add item | Pass |
| Pop-up: Minimum stock | Close / Got it (x2) | Stock (main page) | Pass |
| Pop-up: Offer Lettuce for rescue | Close / Cancel / Kind Kitchen KL (demo partner) Made-up partne and 2 more (x5) | Stock (main page) | Pass |
| Pop-up: Offer Lettuce for rescue | Close / Cancel / Kind Kitchen KL (demo partner) Made-up partne and 2 more (x25) | Waste (main page) | Pass |
| Pop-up: Reset all demo data? | Close / No, keep my data (x2) | Settings (main page) | Pass |
| Pop-up: Reset all demo data? | Yes, reset everything (x1) | Home (main page) | Pass |
| Pop-up: SST | Close / Got it (x2) | Sell (main page) | Pass |
| Pop-up: SST | Close / Got it (x2) | Payment | Pass |
| Pop-up: Service charge | Close / Got it (x2) | Tax and rounding | Pass |
| Pop-up: TIN | Close / Got it (x2) | Business details | Pass |
| Pop-up: TIN ) | Close / Got it (x2) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Pop-up: Unique ID | Close / Got it (x2) | EINV-# | Pass |
| Pop-up: Use oldest first | Close / Got it (x2) | Fresh milk | Pass |
| Pop-up: Void receipt ... | Close / No, keep the sale / Yes, void this sale (x10) | Receipt ... | Pass |
| Pop-up: Void receipt ... | Keyed in by mistake (nothing was made) Ingred / Test sale Ingredients go back into stock. / Customer cancelled (food was already made) In (x10) | Pop-up: Void receipt ... | Pass |
| Pop-up: Void receipt ... | Keyed in by mistake (nothing was made) Ingred (x2) | Already selected, stays on Pop-up: Void receipt #? | Pass |
| Pop-up: Waste log for October # | Close (x6) | Reports (main page) | Pass |
| Pop-up: Waste log for October # | Download file / Copy all (x12) | Pop-up: Waste log for October # | Pass |
| Pop-up: Waste log for October # | Close (x6) | Waste entries, October # | Pass |
| Pop-up: Who is using the app? | Close / Owner / Manager Sees everything: sales, stock / Cashier Sees the till only: take orders, take / Kitchen / Store staff Sees stock, deliveries  (x115) | Home (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Sell (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Recent sales | Pass |
| Pop-up: Who is using the app? | Close (x1) | Invoices | Pass |
| Pop-up: Who is using the app? | Close (x1) | Receipt ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Pick the sale | Pass |
| Pop-up: Who is using the app? | Close (x1) | E-invoice ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Combined e-invoice ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Limitations | Pass |
| Pop-up: Who is using the app? | Close (x1) | EINV-# | Pass |
| Pop-up: Who is using the app? | Close (x1) | Bill ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Payment | Pass |
| Pop-up: Who is using the app? | Close (x1) | Printable view | Pass |
| Pop-up: Who is using the app? | Close (x2) | Order ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Sale done | Pass |
| Pop-up: Who is using the app? | Close (x1) | Fresh milk | Pass |
| Pop-up: Who is using the app? | Close (x1) | New order | Pass |
| Pop-up: Who is using the app? | Close (x1) | Waste (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Waste history: ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Stock (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Receive goods | Pass |
| Pop-up: Who is using the app? | Close (x1) | Count stock | Pass |
| Pop-up: Who is using the app? | Close (x1) | Add item | Pass |
| Pop-up: Who is using the app? | Close (x1) | Orders (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Count saved | Pass |
| Pop-up: Who is using the app? | Close (x1) | Goods received | Pass |
| Pop-up: Who is using the app? | Close (x1) | Reports (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Enter supplier bill | Pass |
| Pop-up: Who is using the app? | Close (x1) | Settings (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Sales by day, October # | Pass |
| Pop-up: Who is using the app? | Close (x1) | Waste entries, October # | Pass |
| Pop-up: Who is using the app? | Close (x1) | Business details | Pass |
| Pop-up: Who is using the app? | Close (x1) | Tax and rounding | Pass |
| Pop-up: Who is using the app? | Close (x1) | Menu and recipes | Pass |
| Pop-up: Who is using the app? | Close (x1) | Alerts | Pass |
| Pop-up: Who is using the app? | Close (x1) | Language | Pass |
| Pop-up: Who is using the app? | Close (x1) | New dish | Pass |
| Pop-up: Who is using the app? ) | Close (x1) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Pop-up: Who is using the app? ) | Owner / Manager Sees everything: sales, stock / Cashier Sees the till only: take orders, take / Kitchen / Store staff Sees stock, deliveries  (x3) | Home (main page) | Pass |
| Pop-up: ☕ Espresso | Close / Cancel / Add to bill · RM 8.00 / Add to bill · RM 11.00 (x48) | Sell (main page) | Pass |
| Pop-up: ☕ Espresso | Extra coffee shot +RM 3.00 / Vanilla syrup +RM 1.50 (x32) | Pop-up: ☕ Espresso | Pass |
| Printable view | Print or save as PDF (x1) | Printable view | Pass |
| Receipt ... | Issue e-invoice for this sale (x2) | E-invoice ... | Pass |
| Receipt ... | Print / Stop waiting for an e-invoice / Customer will ask for an e-invoice later (x5) | Receipt ... | Pass |
| Receipt ... | Void this sale (x2) | Pop-up: Void receipt ... | Pass |
| Receipt ... | Open its e-invoice (x1) | EINV-# | Pass |
| Receipt ... | Void this sale (x1) | Pop-up: Cancel the e-invoice first | Pass |
| Receive goods | End tour / Pick another order / Change something and 3 more (x12) | Receive goods | Pass |
| Receive goods | Back (x1) | New order | Pass |
| Receive goods | Next (x1) | Waste (main page) | Pass |
| Receive goods | Confirm goods received (x1) | Goods received | Pass |
| Recent sales | New sale (x1) | Sell (main page) | Pass |
| Recent sales | Today / Yesterday / 5 Oct (x3) | Recent sales | Pass |
| Recent sales | 14716 6:06 pm Takeaway DuitNow QR RM 35.00 Wa / 14715 6:40 pm Takeaway Card RM 15.90 Paid Ope / 14714 6:17 pm Takeaway DuitNow QR RM 59.35 Pa and 67 more (x70) | Receipt ... | Pass |
| Reports (main page) | End tour / October 2026 / September 2026 / August 2026 (x4) | Reports (main page) | Pass |
| Reports (main page) | Back / Rescued instead of binned 0 kg Open Food Resc (x2) | Waste (main page) | Pass |
| Reports (main page) | Next (x1) | E-invoice ... | Pass |
| Reports (main page) | Copy waste log as spreadsheet (x1) | Pop-up: Waste log for October # | Pass |
| Reports (main page) | Copy daily sales as spreadsheet (x1) | Pop-up: Daily sales for October # | Pass |
| Reports (main page) | Sales (with tax) RM 12,438.75 534 bills · see (x1) | Sales by day, October # | Pass |
| Reports (main page) | Food cost 24.0% RM 2,661.31 of ingredients ·  (x1) | Pop-up: How food cost is worked out | Pass |
| Reports (main page) | Waste RM 70.27 4.35 kg · see every entry › (x1) | Waste entries, October # | Pass |
| Reports (main page) | Cream cheese 0.74 kg RM 25.30 History › / Yogurt 1.1 kg RM 13.15 History › / Turkey ham 0.35 kg RM 11.17 History › and 3 more (x6) | Waste history: ... | Pass |
| Reports (main page) | What does Food cost % mean? (x1) | Pop-up: Food cost % | Pass |
| Sale done | End tour / Customer will ask for an e-invoice later (x2) | Sale done | Pass |
| Sale done | Back (x1) | Payment | Pass |
| Sale done | Next (x1) | Fresh milk | Pass |
| Sale done | See what was used (x1) | Pop-up: Ingredients used by receipt # | Pass |
| Sale done | New sale (x1) | Sell (main page) | Pass |
| Sale done | Issue e-invoice for this sale (x1) | E-invoice ... | Pass |
| Sale done | View receipt (x1) | Receipt ... | Pass |
| Sale done | Back to Home (x1) | Home (main page) | Pass |
| Sales by day, October # | Copy as spreadsheet (x1) | Pop-up: Daily sales for October # | Pass |
| Sell (main page) | Today's sales (x8) | Recent sales | Pass |
| Sell (main page) | All / Coffee / Drinks and 28 more (x221) | Sell (main page) | Pass |
| Sell (main page) | ☕ Espresso Code 101 · has options RM 8.00 (x8) | Pop-up: ☕ Espresso | Pass |
| Sell (main page) | ☕ Americano Code 102 · has options RM 9.00 (x8) | Pop-up: ☕ Americano | Pass |
| Sell (main page) | ☕ Latte Code 103 · has options RM 12.00 (x8) | Pop-up: ☕ Latte | Pass |
| Sell (main page) | ☕ Cappuccino Code 104 · has options RM 12.00 (x8) | Pop-up: ☕ Cappuccino | Pass |
| Sell (main page) | ☕ Flat White Code 105 · has options RM 12.00 (x8) | Pop-up: ☕ Flat White | Pass |
| Sell (main page) | ☕ Mocha Code 106 · has options RM 14.00 (x8) | Pop-up: ☕ Mocha | Pass |
| Sell (main page) | ☕ Caramel Latte Code 107 · has options RM 14. (x8) | Pop-up: ☕ Caramel Latte | Pass |
| Sell (main page) | ☕ Gula Melaka Latte Code 108 · has options RM (x8) | Pop-up: ☕ Gula Melaka Latte | Pass |
| Sell (main page) | 🧊 Iced Long Black Code 109 · has options RM  (x8) | Pop-up: 🧊 Iced Long Black | Pass |
| Sell (main page) | 🍵 Matcha Latte Code 201 · has options RM 14. (x8) | Pop-up: 🍵 Matcha Latte | Pass |
| Sell (main page) | 🍫 Hot Chocolate Code 202 · has options RM 12 (x8) | Pop-up: 🍫 Hot Chocolate | Pass |
| Sell (main page) | 🫖 Teh Tarik Special Code 203 · has options R (x8) | Pop-up: 🫖 Teh Tarik Special | Pass |
| Sell (main page) | 🍋 Lemon Honey Soda Code 204 · has options RM (x8) | Pop-up: 🍋 Lemon Honey Soda | Pass |
| Sell (main page) | 🥤 Limau Kasturi Cooler Code 205 · has option (x8) | Pop-up: 🥤 Limau Kasturi Cooler | Pass |
| Sell (main page) | 🍳 Big Breakfast Code 301 · has options RM 26 (x8) | Pop-up: 🍳 Big Breakfast | Pass |
| Sell (main page) | 🥑 Avocado Toast Code 302 · has options RM 19 (x8) | Pop-up: 🥑 Avocado Toast | Pass |
| Sell (main page) | 🍞 Scrambled Eggs on Toast Code 304 · has opt (x8) | Pop-up: 🍞 Scrambled Eggs on Toast | Pass |
| Sell (main page) | 🍛 Nasi Lemak Ayam Code 307 · has options RM  (x8) | Pop-up: 🍛 Nasi Lemak Ayam | Pass |
| Sell (main page) | 🍔 Chicken Burger Code 401 · has options RM 2 (x8) | Pop-up: 🍔 Chicken Burger | Pass |
| Sell (main page) | 🍔 Beef Burger Code 402 · has options RM 26.0 (x8) | Pop-up: 🍔 Beef Burger | Pass |
| Sell (main page) | 🍝 Mushroom Aglio Olio Code 405 · has options (x8) | Pop-up: 🍝 Mushroom Aglio Olio | Pass |
| Sell (main page) | 🍝 Prawn Aglio Olio Code 406 · has options RM (x8) | Pop-up: 🍝 Prawn Aglio Olio | Pass |
| Sell (main page) | 🍝 Tomato Chicken Pasta Code 407 · has option (x8) | Pop-up: 🍝 Tomato Chicken Pasta | Pass |
| Sell (main page) | 🍚 Nasi Goreng Kampung Code 408 · has options (x8) | Pop-up: 🍚 Nasi Goreng Kampung | Pass |
| Sell (main page) | 🥗 Garden Salad Code 409 · has options RM 15. (x8) | Pop-up: 🥗 Garden Salad | Pass |
| Sell (main page) | Dine-in / Takeaway (x8) | Already selected, stays on Sell (main page) | Pass |
| Sell (main page) | What does SST mean? (x8) | Pop-up: SST | Pass |
| Sell (main page) | Held bills (0) / Held bills (1) (x8) | Pop-up: Held bills | Pass |
| Sell (main page) | What does Service charge mean? (x2) | Pop-up: Service charge | Pass |
| Sell (main page) | What does Rounding mean? (x4) | Pop-up: Rounding | Pass |
| Sell (main page) | Clear bill (x4) | Pop-up: Clear this bill? | Pass |
| Sell (main page) | Back (x1) | Home (main page) | Pass |
| Sell (main page) | Next / Go to payment · RM 14.85 (x3) | Payment | Pass |
| Settings (main page) | Business details Name, address, TIN and regis (x1) | Business details | Pass |
| Settings (main page) | Tax, service charge and rounding The percenta (x1) | Tax and rounding | Pass |
| Settings (main page) | Menu and recipes Add, change or delete dishes (x1) | Menu and recipes | Pass |
| Settings (main page) | Alerts When to warn about food that is close  (x1) | Alerts | Pass |
| Settings (main page) | E-invoice notes The LHDN rules this demo foll (x1) | E-invoice ... | Pass |
| Settings (main page) | Limitations What is pretend in this demo and  (x1) | Limitations | Pass |
| Settings (main page) | Language · Bahasa · 语言 English, Bahasa Melayu (x1) | Language | Pass |
| Settings (main page) | Reset demo data (x1) | Pop-up: Reset all demo data? | Pass |
| Stock (main page) | Count stock (x4) | Count stock | Pass |
| Stock (main page) | Add item (x4) | Add item | Pass |
| Stock (main page) | All items (60) / Low (4) / Expiring soon (6) (x9) | Stock (main page) | Pass |
| Stock (main page) | Expiring soon (6) / All items (60) / Low (4) (x3) | Already selected, stays on Stock (main page) | Pass |
| Stock (main page) | Lettuce / Lettuce 4.2 kg 2 kg Tomorrow 8 Oct Pasar Pagi (x3) | Lettuce | Pass |
| Stock (main page) | Offer for rescue (x1) | Pop-up: Offer Lettuce for rescue | Pass |
| Stock (main page) | Log as waste (x6) | Pop-up: Log this batch as waste? | Pass |
| Stock (main page) | Sourdough loaf / Sourdough loaf 12.8 loaves 6 loaves Tomorrow  (x3) | Sourdough loaf | Pass |
| Stock (main page) | Offer for rescue (x1) | Pop-up: Offer Sourdough loaf for rescue | Pass |
| Stock (main page) | Chicken breast / Chicken breast 10 kg 5 kg Tomorrow 8 Oct Ayam (x3) | Chicken breast | Pass |
| Stock (main page) | Offer for rescue (x1) | Pop-up: Offer Chicken breast for rescue | Pass |
| Stock (main page) | Spinach / Spinach 2.1 kg 1 kg In 2 days 9 Oct Pasar Pag (x3) | Spinach | Pass |
| Stock (main page) | Offer for rescue (x1) | Pop-up: Offer Spinach for rescue | Pass |
| Stock (main page) | Prawns / Prawns 3.15 kg 1.5 kg In 2 days 9 Oct Ayam &  (x4) | Prawns | Pass |
| Stock (main page) | Offer for rescue (x2) | Pop-up: Offer Prawns for rescue | Pass |
| Stock (main page) | What does Minimum stock mean? (x3) | Pop-up: Minimum stock | Pass |
| Stock (main page) | Fresh milk 5 L 12 L In 4 days 11 Oct Lembah F / Fresh milk 4.8 L 12 L In 4 days 11 Oct Lembah (x3) | Fresh milk | Pass |
| Stock (main page) | Oat milk 10.22 L 4 L In 58 days 4 Dec Lembah  (x2) | Oat milk | Pass |
| Stock (main page) | Whipping cream 2.92 L 2 L In 7 days 14 Oct Le (x2) | Whipping cream | Pass |
| Stock (main page) | Butter 3.52 kg 2 kg In 44 days 20 Nov Lembah  / Butter 3.51 kg 2 kg In 44 days 20 Nov Lembah  (x2) | Butter | Pass |
| Stock (main page) | Cheddar slices 3.55 kg 1.5 kg In 30 days 6 No (x2) | Cheddar slices | Pass |
| Stock (main page) | Mozzarella 3.21 kg 1.5 kg In 21 days 28 Oct L (x2) | Mozzarella | Pass |
| Stock (main page) | Yogurt 3.34 kg 2 kg In 7 days 14 Oct Lembah F (x2) | Yogurt | Pass |
| Stock (main page) | Eggs 119.5 pieces 60 pieces In 19 days 26 Oct (x2) | Eggs | Pass |
| Stock (main page) | Cream cheese 1.68 kg 1 kg In 25 days 1 Nov Le (x2) | Cream cheese | Pass |
| Stock (main page) | Tomato 5.22 kg 3 kg In 4 days 11 Oct Pasar Pa (x2) | Tomato | Pass |
| Stock (main page) | Cucumber 4.53 kg 2 kg In 4 days 11 Oct Pasar  (x2) | Cucumber | Pass |
| Stock (main page) | Onion 5.88 kg 3 kg In 30 days 6 Nov Pasar Pag (x2) | Onion | Pass |
| Stock (main page) | Garlic 2.15 kg 1 kg In 43 days 19 Nov Pasar P (x2) | Garlic | Pass |
| Stock (main page) | Chilli 1.2 kg 0.5 kg In 8 days 15 Oct Pasar P (x2) | Chilli | Pass |
| Stock (main page) | Lemon 29.46 pieces 15 pieces In 8 days 15 Oct (x2) | Lemon | Pass |
| Stock (main page) | Limau kasturi 1.88 kg 1 kg In 3 days 10 Oct P (x2) | Limau kasturi | Pass |
| Stock (main page) | Banana 6.79 kg 3 kg In 3 days 10 Oct Pasar Pa (x2) | Banana | Pass |
| Stock (main page) | Avocado 6 pieces 10 pieces In 3 days 10 Oct P (x3) | Avocado | Pass |
| Stock (main page) | Mushrooms 2.18 kg 1.5 kg In 3 days 10 Oct Pas (x2) | Mushrooms | Pass |
| Stock (main page) | Potato 12.21 kg 5 kg In 26 days 2 Nov Pasar P (x2) | Potato | Pass |
| Stock (main page) | Mixed berries (frozen) 3.67 kg 2 kg In 175 da (x2) | Mixed berries (frozen) | Pass |
| Stock (main page) | Mango 4.89 kg 2 kg In 3 days 10 Oct Pasar Pag (x2) | Mango | Pass |
| Stock (main page) | Croissant (frozen dough) 14 pieces 30 pieces  / Croissant (frozen dough) 13 pieces 30 pieces  (x3) | Croissant (frozen dough) | Pass |
| Stock (main page) | Burger bun 39.93 pieces 20 pieces In 3 days 1 (x2) | Burger bun | Pass |
| Stock (main page) | Bagel 28.42 pieces 12 pieces In 3 days 10 Oct (x2) | Bagel | Pass |
| Stock (main page) | Tortilla wrap 32.95 pieces 20 pieces In 10 da (x2) | Tortilla wrap | Pass |
| Stock (main page) | Flour 11.69 kg 8 kg In 175 days 31 Mar Roti R (x2) | Flour | Pass |
| Stock (main page) | Sugar 11.14 kg 5 kg In 363 days 5 Oct Roti Ru (x2) | Sugar | Pass |
| Stock (main page) | Cocoa powder 2.44 kg 1 kg In 361 days 3 Oct R (x2) | Cocoa powder | Pass |
| Stock (main page) | Dark chocolate 2.22 kg 1.5 kg In 297 days 31  (x2) | Dark chocolate | Pass |
| Stock (main page) | Almond flakes 1.12 kg 0.5 kg In 179 days 4 Ap (x2) | Almond flakes | Pass |
| Stock (main page) | Coffee beans 2.5 kg 4 kg In 23 days 30 Oct Bi / Coffee beans 2.48 kg 4 kg In 23 days 30 Oct B (x3) | Coffee beans | Pass |
| Stock (main page) | Matcha powder 0.58 kg 0.3 kg In 179 days 4 Ap (x2) | Matcha powder | Pass |
| Stock (main page) | Tea leaves 1.02 kg 0.5 kg In 360 days 2 Oct B (x2) | Tea leaves | Pass |
| Stock (main page) | Vanilla syrup 1.94 L 1 L In 360 days 2 Oct Bi (x2) | Vanilla syrup | Pass |
| Stock (main page) | Caramel sauce 1.58 L 1 L In 360 days 2 Oct Bi (x2) | Caramel sauce | Pass |
| Stock (main page) | Honey 1.87 kg 1 kg In 365 days 7 Oct Biji Hit (x2) | Honey | Pass |
| Stock (main page) | Gula melaka 1.75 kg 1 kg In 179 days 4 Apr Bi (x2) | Gula melaka | Pass |
| Stock (main page) | Soda water 25.47 L 10 L In 179 days 4 Apr Bij (x2) | Soda water | Pass |
| Stock (main page) | Orange juice 6.78 L 4 L In 4 days 11 Oct Biji (x2) | Orange juice | Pass |
| Stock (main page) | Rice 25.35 kg 10 kg In 364 days 6 Oct Kedai K (x2) | Rice | Pass |
| Stock (main page) | Pasta 8.29 kg 4 kg In 361 days 3 Oct Kedai Ke (x2) | Pasta | Pass |
| Stock (main page) | Coconut milk 6.81 L 3 L In 176 days 1 Apr Ked (x2) | Coconut milk | Pass |
| Stock (main page) | Cooking oil 11.36 L 5 L In 362 days 4 Oct Ked (x2) | Cooking oil | Pass |
| Stock (main page) | Olive oil 1.57 L 1 L In 362 days 4 Oct Kedai  (x2) | Olive oil | Pass |
| Stock (main page) | Sambal paste 3.31 kg 2 kg In 58 days 4 Dec Ke (x2) | Sambal paste | Pass |
| Stock (main page) | Ikan bilis 1.73 kg 1 kg In 117 days 1 Feb Ked (x2) | Ikan bilis | Pass |
| Stock (main page) | Peanuts 1.91 kg 1 kg In 117 days 1 Feb Kedai  (x2) | Peanuts | Pass |
| Stock (main page) | Tomato pasta sauce 7.49 kg 3 kg In 235 days 3 (x2) | Tomato pasta sauce | Pass |
| Stock (main page) | Mayonnaise 2.46 kg 1.5 kg In 119 days 3 Feb K (x2) | Mayonnaise | Pass |
| Stock (main page) | Beef patty 47.77 pieces 20 pieces In 3 days 1 (x2) | Beef patty | Pass |
| Stock (main page) | Smoked salmon 2.24 kg 1 kg In 5 days 12 Oct A (x2) | Smoked salmon | Pass |
| Stock (main page) | Tuna (canned) 3.36 kg 1.5 kg In 363 days 5 Oc (x2) | Tuna (canned) | Pass |
| Stock (main page) | Turkey ham 1.84 kg 1 kg In 7 days 14 Oct Ayam (x2) | Turkey ham | Pass |
| Stock (main page) | Chicken sausage 34.36 pieces 20 pieces In 11  (x2) | Chicken sausage | Pass |
| Tax and rounding | Add a service charge to dine-in bills / Also add it to takeaway bills / Charge SST (only if the outlet is registered  and 2 more (x5) | Tax and rounding | Pass |
| Tax and rounding | What does Service charge mean? (x2) | Pop-up: Service charge | Pass |
| Tax and rounding | What does SST mean? (x2) | Pop-up: SST | Pass |
| Tax and rounding | What does Rounding mean? (x2) | Pop-up: Rounding | Pass |
| Waste (main page) | See what is expiring soon (x10) | Stock (main page) | Pass |
| Waste (main page) | Waste log / Food Rescue / Expired and 10 more (x75) | Waste (main page) | Pass |
| Waste (main page) | Today, 7:47 pm Mushrooms 0.6 kg Expired Added / Today, 7:47 pm Banana 1.5 kg Expired Added au / 4 Oct, 3:30 pm Chicken sausage 1 piece Overpr and 55 more (x400) | Waste history: ... | Pass |
| Waste (main page) | Waste log / Food Rescue / Expired (x14) | Already selected, stays on Waste (main page) | Pass |
| Waste (main page) | What does Food Rescue mean? (x5) | Pop-up: Food Rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Lettuce for rescue | Pass |
| Waste (main page) | Offer for rescue (x10) | Pop-up: Offer Sourdough loaf for rescue | Pass |
| Waste (main page) | Offer for rescue (x10) | Pop-up: Offer Chicken breast for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Spinach for rescue | Pass |
| Waste (main page) | Offer for rescue (x10) | Pop-up: Offer Prawns for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Limau kasturi for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Banana for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Avocado for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Mushrooms for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Mango for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Burger bun for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Bagel for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Beef patty for rescue | Pass |
| Waste (main page) | Back (x1) | Receive goods | Pass |
| Waste (main page) | Next (x1) | Reports (main page) | Pass |
| Waste (main page) | Back to Home (x2) | Home (main page) | Pass |
| Waste entries, October # | Copy as spreadsheet (x1) | Pop-up: Waste log for October # | Pass |
| Waste entries, October # | 7 Oct Mushrooms 0.6 kg Expired 0.6 kg RM 10.8 / 7 Oct Banana 1.5 kg Expired 1.5 kg RM 8.25 Hi / 4 Oct Chicken sausage 1 piece Overproduced 0. and 4 more (x7) | Waste history: ... | Pass |
| Waste history: ... | Open this item in Stock (x1) | Fresh milk | Pass |
| Welcome tour step | Skip the tour / Finish (x6) | Home (main page) | Pass |
| Welcome tour step | Next / Back (x8) | Welcome tour step | Pass |

### Started as Kitchen staff

| Screen | Button | Where it leads | Result |
|---|---|---|---|
|  Every screen (menu and top bar) | Home / Stock / Orders and 5 more (x15) | Already on that page, stays there | Pass |
|  Every screen (menu and top bar) | Stock (x87) | Stock (main page) | Pass |
|  Every screen (menu and top bar) | Orders (x87) | Orders (main page) | Pass |
|  Every screen (menu and top bar) | Waste (x87) | Waste (main page) | Pass |
|  Every screen (menu and top bar) | Help / Tours Replay the welcome tour, or start the s (x257) | Pop-up: Help for that page | Pass |
|  Every screen (menu and top bar) | Viewing as: Kitchen ▾ / Viewing as: Cashier ▾ / Viewing as: Owner ▾ (x127) | Pop-up: Who is using the app? | Pass |
|  Every screen (menu and top bar) | Demo tour / Home (x255) | Home (main page) | Pass |
|  Every screen (menu and top bar) | Back / Cancel / Back to the bill and 13 more (x225) | The page before | Pass |
|  Every screen (menu and top bar) | Viewing as: Kitchen ▾ (x1) | Pop-up: Who is using the app? ) | Pass |
|  Every screen (menu and top bar) | Sell (x65) | Sell (main page) | Pass |
|  Every screen (menu and top bar) | Invoices 4 (x32) | Invoices (main page) | Pass |
|  Every screen (menu and top bar) | Settings (x32) | Settings (main page) | Pass |
|  Every screen (menu and top bar) | Reports (x32) | Reports (main page) | Pass |
| Add item | What does Minimum stock mean? (x2) | Pop-up: Minimum stock | Pass |
| Add item | Save item / Fix it (x5) | Add item | Pass |
| Alerts | 1 day / 2 days / 3 days and 2 more (x5) | Alerts | Pass |
| Bill ... | Mark as paid / Mark as not paid / Mark e-invoice as received (x6) | Bill ... | Pass |
| Bill ... | Open order #105 / Open order #104 / Open order #102 (x4) | Order ... | Pass |
| Bill ... | What does E-invoice mean? (x4) | Pop-up: E-invoice | Pass |
| Bill ... | What does Unique ID mean? (x2) | Pop-up: Unique ID | Pass |
| Business details | What does TIN mean? (x1) | Pop-up: TIN | Pass |
| Business details | What does Business registration number mean? (x1) | Pop-up: Business registration number | Pass |
| Business details | What does SST mean? (x1) | Pop-up: SST | Pass |
| Business details | What does Business activity code mean? (x1) | Pop-up: Business activity code | Pass |
| CN-# | Printable view (x1) | Printable view | Pass |
| CN-# | Show JSON (x1) | Pop-up: E-invoice CN-# as JSON (simplified UBL #.# layout) | Pass |
| CN-# | Cancel this e-invoice (x1) | Pop-up: Cancel e-invoice CN-#? | Pass |
| CN-# | Open receipt 14722 (x2) | Receipt ... | Pass |
| CN-# | What does Unique ID mean? (x2) | Pop-up: Unique ID | Pass |
| CN-# | What does TIN mean? (x2) | Pop-up: TIN | Pass |
| CN-# | What does Business registration number mean? (x2) | Pop-up: Business registration number | Pass |
| CN-# | What does Business activity code mean? (x2) | Pop-up: Business activity code | Pass |
| CN-# | What does Classification code mean? (x2) | Pop-up: Classification code | Pass |
| CN-# | What does Tax type mean? (x2) | Pop-up: Tax type | Pass |
| Combined e-invoice ... | What does Combined e-invoice mean? (x1) | Pop-up: Combined e-invoice | Pass |
| Combined e-invoice ... | September 2026 / October 2026 / Save and go to Check items and 4 more (x7) | Combined e-invoice ... | Pass |
| Combined e-invoice ... | Save draft and close / Back to Invoices (x2) | Invoices (main page) | Pass |
| Combined e-invoice ... | What does Classification code mean? (x2) | Pop-up: Classification code | Pass |
| Combined e-invoice ... | What does Tax type mean? (x2) | Pop-up: Tax type | Pass |
| Combined e-invoice ... | What does TIN mean? (x1) | Pop-up: TIN | Pass |
| Combined e-invoice ... | What does Business registration number mean? (x1) | Pop-up: Business registration number | Pass |
| Combined e-invoice ... | What does Business activity code mean? (x1) | Pop-up: Business activity code | Pass |
| Combined e-invoice ... | Open the e-invoice (x1) | EINV-# | Pass |
| Count saved | Back to Stock (x1) | Stock (main page) | Pass |
| Count saved | Back to Home (x1) | Home (main page) | Pass |
| Count stock | Dairy / Produce / Bakery and 3 more (x6) | Count stock | Pass |
| Count stock | Save count (x1) | Count saved | Pass |
| Credit note ... | What does Credit note mean? (x4) | Pop-up: Credit note | Pass |
| Credit note ... | Wrong items or amounts / Customer returned the order / Wrong buyer details and 6 more (x19) | Credit note ... | Pass |
| Credit note ... | Save draft and close / New sale (x5) | Sell (main page) | Pass |
| Credit note ... | Wrong items or amounts (x2) | Already selected, stays on Credit note CN-# | Pass |
| Credit note ... | What does Classification code mean? (x2) | Pop-up: Classification code | Pass |
| Credit note ... | What does Tax type mean? (x2) | Pop-up: Tax type | Pass |
| Credit note ... | What does TIN mean? (x1) | Pop-up: TIN | Pass |
| Credit note ... | What does Business registration number mean? (x1) | Pop-up: Business registration number | Pass |
| Credit note ... | What does Business activity code mean? (x1) | Pop-up: Business activity code | Pass |
| Credit note ... | Open the e-invoice (x1) | CN-# | Pass |
| E-invoice ... | Syarikat Contoh Maju Sdn Bhd (demo company) / Aina Demo (demo individual) / Buyer with a wrong TIN (shows a rejection) and 10 more (x37) | E-invoice ... | Pass |
| E-invoice ... | A business (x4) | Already selected, stays on E-invoice EINV-# | Pass |
| E-invoice ... | What does TIN mean? (x5) | Pop-up: TIN | Pass |
| E-invoice ... | What does Business registration number mean? (x5) | Pop-up: Business registration number | Pass |
| E-invoice ... | What does SST mean? (x4) | Pop-up: SST | Pass |
| E-invoice ... | Save draft and close / New sale (x5) | Sell (main page) | Pass |
| E-invoice ... | What does Classification code mean? (x2) | Pop-up: Classification code | Pass |
| E-invoice ... | What does Tax type mean? (x2) | Pop-up: Tax type | Pass |
| E-invoice ... | What does Business activity code mean? (x1) | Pop-up: Business activity code | Pass |
| E-invoice ... | Open the e-invoice / Next / Back (x3) | EINV-# | Pass |
| E-invoice ... | Back (x1) | Reports (main page) | Pass |
| E-invoice ... | See the full limitations list (x1) | Limitations | Pass |
| EINV-# | Printable view (x3) | Printable view | Pass |
| EINV-# | Show JSON (x3) | Pop-up: E-invoice EINV-# as JSON (simplified UBL #.# layout) | Pass |
| EINV-# | Issue credit note (x3) | Credit note ... | Pass |
| EINV-# | Cancel this e-invoice (x2) | Pop-up: Cancel e-invoice EINV-#? | Pass |
| EINV-# | Open receipt 14716 / Open receipt 14520 / Open receipt 14585 / Open receipt 14514 (x4) | Receipt ... | Pass |
| EINV-# | What does Unique ID mean? (x5) | Pop-up: Unique ID | Pass |
| EINV-# | What does TIN mean? (x6) | Pop-up: TIN | Pass |
| EINV-# | What does Business registration number mean? (x6) | Pop-up: Business registration number | Pass |
| EINV-# | What does Business activity code mean? (x6) | Pop-up: Business activity code | Pass |
| EINV-# | What does Classification code mean? (x6) | Pop-up: Classification code | Pass |
| EINV-# | What does Tax type mean? (x6) | Pop-up: Tax type | Pass |
| EINV-# | End tour (x1) | EINV-# | Pass |
| EINV-# | Back / Next / Issue a new e-invoice for this sale / Fix and send again (x4) | E-invoice ... | Pass |
| Enter supplier bill | What does E-invoice mean? (x2) | Pop-up: E-invoice | Pass |
| Enter supplier bill | Save bill / Fix it (x4) | Enter supplier bill | Pass |
| Espresso | Picture ☕ (x2) | Already selected, stays on Espresso | Pass |
| Espresso | Picture 🧊 / Picture 🍵 / Picture 🥤 and 32 more (x69) | Espresso | Pass |
| Espresso | What does Food cost % mean? (x2) | Pop-up: Food cost % | Pass |
| Espresso | Delete dish (x2) | Pop-up: Delete Espresso? | Pass |
| Espresso | Save dish (x2) | Menu and recipes | Pass |
| Fresh milk | Order more / Next (x2) | New order | Pass |
| Fresh milk | Log waste (x1) | Waste (main page) | Pass |
| Fresh milk | Fix the count (x1) | Pop-up: Fix the count: Fresh milk | Pass |
| Fresh milk | Edit item (x1) | Pop-up: Edit Fresh milk | Pass |
| Fresh milk | What does Use oldest first mean? (x1) | Pop-up: Use oldest first | Pass |
| Fresh milk | Log as waste (x1) | Pop-up: Log this batch as waste? | Pass |
| Fresh milk | See all waste for this item (x1) | Waste history: ... | Pass |
| Fresh milk | End tour (x1) | Fresh milk | Pass |
| Fresh milk | Back (x1) | Sale done | Pass |
| Goods received | Back to Home (x1) | Home (main page) | Pass |
| Goods received | Enter the supplier bill (x1) | Enter supplier bill | Pass |
| Goods received | See stock (x1) | Stock (main page) | Pass |
| Home (main page) | Receive delivery / Delivery from Roti Rumah Bakery Supply (demo) / Delivery from Pasar Pagi Produce (demo) is du (x3) | Receive goods | Pass |
| Home (main page) | Log waste / 2 items passed the expiry date Moved to the w (x2) | Waste (main page) | Pass |
| Home (main page) | Count stock (x1) | Count stock | Pass |
| Home (main page) | Expiring soon / 5 items expiring in 2 days Lettuce, Sourdough / 1 more item below minimum stock Some of them  (x3) | Stock (main page) | Pass |
| Home (main page) | Fresh milk is low 5 L left. Minimum is 12 L.  / Avocado is low 6 pieces left. Minimum is 10 p / Croissant (frozen dough) is low 14 pieces lef (x3) | New order | Pass |
| Home (main page) | End tour (x1) | Home (main page) | Pass |
| Home (main page) | Next (x1) | Sell (main page) | Pass |
| Invoices (main page) | What does E-invoice mean? (x8) | Pop-up: E-invoice | Pass |
| Invoices (main page) | Issue e-invoice (x8) | Pick the sale | Pass |
| Invoices (main page) | E-invoice notes / 14722 7 Oct 2026, 7:46 pm RM 43.45 Issue e-in / 14647 7 Oct 2026, 8:19 am RM 8.50 Issue e-inv / 14645 6 Oct 2026, 7:02 pm RM 39.65 Issue e-in (x11) | E-invoice ... | Pass |
| Invoices (main page) | Combined e-invoice for September 2026 walk-in (x8) | Combined e-invoice ... | Pass |
| Invoices (main page) | All (4) / Waiting (3) / Drafts (0) and 5 more (x50) | Invoices (main page) | Pass |
| Invoices (main page) | EINV-26-00004 E-invoice Aina Binti Demo (DEMO / EINV-26-00003 E-invoice Kedai Ujian Enterpris / EINV-26-00002 E-invoice Aina Binti Demo (DEMO / EINV-26-00001 E-invoice Syarikat Contoh Maju  (x12) | EINV-# | Pass |
| Invoices (main page) | All (4) / Waiting (3) / Drafts (0) and 4 more (x7) | Already selected, stays on Invoices (main page) | Pass |
| Invoices (main page) | INV-D-2101 Lembah Fresh Dairy Sdn Bhd (demo)  / INV-C-2102 Biji Hitam Coffee Roasters (demo)  / INV-K-2103 Kedai Kering Dry Goods (demo) RM 2 and 2 more (x5) | Bill ... | Pass |
| Language | English / Bahasa Melayu / 中文 (简体) (x3) | Language | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Create order (x1) | New order | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Edit details (x1) | Pop-up: Edit supplier ) | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | What does TIN mean? (x1) | Pop-up: TIN ) | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Fresh milk RM 7.50 / L Open › (x1) | Fresh milk | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Oat milk RM 11.00 / L Open › (x1) | Oat milk | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Whipping cream RM 16.00 / L Open › (x1) | Whipping cream | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Butter RM 38.00 / kg Open › (x1) | Butter | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Cheddar slices RM 42.00 / kg Open › (x1) | Cheddar slices | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Mozzarella RM 36.00 / kg Open › (x1) | Mozzarella | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Yogurt RM 12.00 / kg Open › (x1) | Yogurt | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Eggs RM 0.55 / piece Open › (x1) | Eggs | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | Cream cheese RM 34.00 / kg Open › (x1) | Cream cheese | Pass |
| Lembah Fresh Dairy Sdn Bhd (demo) | #108 28 Sep Cancelled Open › / #101 21 Sep Received Open › (x2) | Order ... | Pass |
| Menu and recipes | Add dish (x1) | New dish | Pass |
| Menu and recipes | 101 ☕ Espresso Coffee RM 8.00 RM 1.40 18% Cha (x1) | Espresso | Pass |
| Menu and recipes | 102 ☕ Americano Coffee RM 9.00 RM 1.40 16% Ch (x1) | Americano | Pass |
| Menu and recipes | 103 ☕ Latte Coffee RM 12.00 RM 2.90 24% Chang (x1) | Latte | Pass |
| Menu and recipes | 104 ☕ Cappuccino Coffee RM 12.00 RM 2.75 23%  (x1) | Cappuccino | Pass |
| Menu and recipes | 105 ☕ Flat White Coffee RM 12.00 RM 2.60 22%  (x1) | Flat White | Pass |
| Menu and recipes | 106 ☕ Mocha Coffee RM 14.00 RM 3.32 24% Chang (x1) | Mocha | Pass |
| Menu and recipes | 107 ☕ Caramel Latte Coffee RM 14.00 RM 3.42 2 (x1) | Caramel Latte | Pass |
| Menu and recipes | 108 ☕ Gula Melaka Latte Coffee RM 14.00 RM 3. (x1) | Gula Melaka Latte | Pass |
| Menu and recipes | 109 🧊 Iced Long Black Coffee RM 10.00 RM 1.4 (x1) | Iced Long Black | Pass |
| Menu and recipes | 201 🍵 Matcha Latte Drinks RM 14.00 RM 2.53 1 (x1) | Matcha Latte | Pass |
| Menu and recipes | 202 🍫 Hot Chocolate Drinks RM 12.00 RM 3.05  (x1) | Hot Chocolate | Pass |
| Menu and recipes | 203 🫖 Teh Tarik Special Drinks RM 7.00 RM 1. (x1) | Teh Tarik Special | Pass |
| Menu and recipes | 204 🍋 Lemon Honey Soda Drinks RM 10.00 RM 1. (x1) | Lemon Honey Soda | Pass |
| Menu and recipes | 205 🥤 Limau Kasturi Cooler Drinks RM 9.00 RM (x1) | Limau Kasturi Cooler | Pass |
| Menu and recipes | 206 🥭 Mango Smoothie Drinks RM 14.00 RM 3.30 (x1) | Mango Smoothie | Pass |
| Menu and recipes | 207 🫐 Berry Smoothie Drinks RM 15.00 RM 6.55 (x1) | Berry Smoothie | Pass |
| Menu and recipes | 208 🍊 Orange Juice Drinks RM 11.00 RM 2.70 2 (x1) | Orange Juice | Pass |
| Menu and recipes | 301 🍳 Big Breakfast Breakfast RM 26.00 RM 7. (x1) | Big Breakfast | Pass |
| Menu and recipes | 302 🥑 Avocado Toast Breakfast RM 19.00 RM 7. (x1) | Avocado Toast | Pass |
| Menu and recipes | 303 🥯 Smoked Salmon Bagel Breakfast RM 24.00 (x1) | Smoked Salmon Bagel | Pass |
| Menu and recipes | 304 🍞 Scrambled Eggs on Toast Breakfast RM 1 (x1) | Scrambled Eggs on Toast | Pass |
| Menu and recipes | 305 🥞 Banana Pancakes Breakfast RM 17.00 RM  (x1) | Banana Pancakes | Pass |
| Menu and recipes | 306 🥣 Berry Yogurt Bowl Breakfast RM 15.00 R (x1) | Berry Yogurt Bowl | Pass |
| Menu and recipes | 307 🍛 Nasi Lemak Ayam Breakfast RM 16.00 RM  (x1) | Nasi Lemak Ayam | Pass |
| Menu and recipes | 401 🍔 Chicken Burger Mains RM 22.00 RM 5.60  (x1) | Chicken Burger | Pass |
| Menu and recipes | 402 🍔 Beef Burger Mains RM 26.00 RM 8.61 33% (x1) | Beef Burger | Pass |
| Menu and recipes | 403 🌯 Chicken Caesar Wrap Mains RM 19.00 RM  (x1) | Chicken Caesar Wrap | Pass |
| Menu and recipes | 404 🥪 Tuna Melt Sandwich Mains RM 18.00 RM 5 (x1) | Tuna Melt Sandwich | Pass |
| Menu and recipes | 405 🍝 Mushroom Aglio Olio Mains RM 20.00 RM  (x1) | Mushroom Aglio Olio | Pass |
| Menu and recipes | 406 🍝 Prawn Aglio Olio Mains RM 26.00 RM 5.9 (x1) | Prawn Aglio Olio | Pass |
| Menu and recipes | 407 🍝 Tomato Chicken Pasta Mains RM 22.00 RM (x1) | Tomato Chicken Pasta | Pass |
| Menu and recipes | 408 🍚 Nasi Goreng Kampung Mains RM 16.00 RM  (x1) | Nasi Goreng Kampung | Pass |
| Menu and recipes | 409 🥗 Garden Salad Mains RM 15.00 RM 4.90 33 (x1) | Garden Salad | Pass |
| Menu and recipes | 410 🥐 Turkey Ham Cheese Croissant Mains RM 1 (x1) | Turkey Ham Cheese Croissant | Pass |
| Menu and recipes | 411 🍟 Fries Mains RM 9.00 RM 0.97 11% Change (x1) | Fries | Pass |
| Menu and recipes | 501 🥐 Butter Croissant Bakery RM 8.00 RM 2.3 (x1) | Butter Croissant | Pass |
| Menu and recipes | 502 🥐 Almond Croissant Bakery RM 11.00 RM 3. (x1) | Almond Croissant | Pass |
| Menu and recipes | 503 🍫 Chocolate Brownie Bakery RM 10.00 RM 3 (x1) | Chocolate Brownie | Pass |
| Menu and recipes | 504 🍌 Banana Bread Slice Bakery RM 8.00 RM 1 (x1) | Banana Bread Slice | Pass |
| Menu and recipes | 505 🍰 Burnt Cheesecake Slice Bakery RM 15.00 (x1) | Burnt Cheesecake Slice | Pass |
| Menu and recipes | 506 🧁 Berry Muffin Bakery RM 8.00 RM 2.34 29 (x1) | Berry Muffin | Pass |
| Menu and recipes | 507 🍰 Gula Melaka Cake Slice Bakery RM 12.00 (x1) | Gula Melaka Cake Slice | Pass |
| Menu and recipes | 508 🥯 Bagel with Cream Cheese Bakery RM 10.0 (x1) | Bagel with Cream Cheese | Pass |
| Menu and recipes | 509 🍞 Garlic Toast Bakery RM 7.00 RM 1.52 22 (x1) | Garlic Toast | Pass |
| New dish | Picture ☕ / Picture 🧊 / Picture 🍵 and 33 more (x72) | New dish | Pass |
| New dish | Picture 🍽️ (x2) | Already selected, stays on New dish | Pass |
| New dish | What does Food cost % mean? (x2) | Pop-up: Food cost % | Pass |
| New order | Less Fresh milk / More Fresh milk / More Oat milk and 27 more (x37) | New order | Pass |
| New order | Send order to Lembah Fresh Dairy Sdn Bhd (x1) | Order ... | Pass |
| New order | Back (x1) | Fresh milk | Pass |
| New order | Next (x1) | Receive goods | Pass |
| Order ... | Order from this supplier again (x1) | New order | Pass |
| Order ... | Whipping cream 4 L 0 L RM 16.00 RM 64.00 (x1) | Whipping cream | Pass |
| Order ... | Receive goods (x2) | Receive goods | Pass |
| Order ... | Cancel order (x1) | Pop-up: Cancel order #? | Pass |
| Order ... | Spinach 2 kg 0 kg RM 12.00 RM 24.00 (x1) | Spinach | Pass |
| Order ... | Mushrooms 3 kg 0 kg RM 18.00 RM 54.00 (x1) | Mushrooms | Pass |
| Order ... | Mango 4 kg 0 kg RM 9.00 RM 36.00 (x1) | Mango | Pass |
| Order ... | Lemon 30 pieces 0 pieces RM 1.20 RM 36.00 (x1) | Lemon | Pass |
| Order ... | Lettuce 4 kg 0 kg RM 9.00 RM 36.00 / Lettuce 5 kg 5 kg All in RM 9.00 RM 45.00 (x2) | Lettuce | Pass |
| Order ... | Close order (the rest is not coming) (x1) | Pop-up: Close order #? | Pass |
| Order ... | Sourdough loaf 12 loaves 6 loaves Part RM 9.0 (x1) | Sourdough loaf | Pass |
| Order ... | Burger bun 40 pieces 20 pieces Part RM 1.10 R (x1) | Burger bun | Pass |
| Order ... | Bagel 24 pieces 12 pieces Part RM 2.00 RM 48. (x1) | Bagel | Pass |
| Order ... | Open the supplier bill (x1) | Bill ... | Pass |
| Order ... | Tomato 8 kg 8 kg All in RM 6.00 RM 48.00 (x1) | Tomato | Pass |
| Order ... | Banana 6 kg 6 kg All in RM 5.50 RM 33.00 (x1) | Banana | Pass |
| Order ... | Avocado 24 pieces 24 pieces All in RM 5.50 RM (x1) | Avocado | Pass |
| Order ... | Back to Orders (x1) | Orders (main page) | Pass |
| Order ... | Back to Home (x1) | Home (main page) | Pass |
| Order ... | Open this order (x1) | Order ... | Pass |
| Orders (main page) | Create order / Turn into an order (1 item) (x7) | New order | Pass |
| Orders (main page) | Receive delivery (x3) | Receive goods | Pass |
| Orders (main page) | Orders (8) / Suggested (4) / Suppliers (6) / Supplier bills (5) (x16) | Orders (main page) | Pass |
| Orders (main page) | #108 Lembah Fresh Dairy Sdn Bhd (demo) 28 Sep / #107 Pasar Pagi Produce (demo) 6 Oct 7 Oct RM / #106 Roti Rumah Bakery Supply (demo) 5 Oct 7  and 5 more (x16) | Order ... | Pass |
| Orders (main page) | Orders (8) / Suggested (4) / Suppliers (6) / Supplier bills (5) (x4) | Already selected, stays on Orders (main page) | Pass |
| Orders (main page) | Add supplier (x1) | Pop-up: Add supplier | Pass |
| Orders (main page) | Lembah Fresh Dairy Sdn Bhd (demo) 03-5550 010 (x1) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Orders (main page) | Pasar Pagi Produce (demo) 03-5550 0102 1 day  (x1) | Pasar Pagi Produce (demo) | Pass |
| Orders (main page) | Roti Rumah Bakery Supply (demo) 03-5550 0103  (x1) | Roti Rumah Bakery Supply (demo) | Pass |
| Orders (main page) | Biji Hitam Coffee Roasters (demo) 03-5550 010 (x1) | Biji Hitam Coffee Roasters (demo) | Pass |
| Orders (main page) | Kedai Kering Dry Goods (demo) 03-5550 0105 2  (x1) | Kedai Kering Dry Goods (demo) | Pass |
| Orders (main page) | Ayam & Laut Fresh Proteins (demo) 03-5550 010 (x1) | Ayam & Laut Fresh Proteins (demo) | Pass |
| Orders (main page) | Enter supplier bill (x1) | Enter supplier bill | Pass |
| Orders (main page) | What does E-invoice mean? (x1) | Pop-up: E-invoice | Pass |
| Orders (main page) | INV-P-2105 Pasar Pagi Produce (demo) 4 Oct 17 / INV-M-2104 Ayam & Laut Fresh Proteins (demo)  / INV-K-2103 Kedai Kering Dry Goods (demo) 27 S and 2 more (x5) | Bill ... | Pass |
| Payment | End tour / Card / DuitNow QR and 9 more (x34) | Payment | Pass |
| Payment | Back (x1) | Sell (main page) | Pass |
| Payment | Next / Confirm payment of RM 24.50 / Confirm payment of RM 14.85 (x8) | Sale done | Pass |
| Payment | Cash / RM 30.00 / Card and 2 more (x9) | Already selected, stays on Payment | Pass |
| Payment | What does Service charge mean? (x4) | Pop-up: Service charge | Pass |
| Payment | What does SST mean? (x8) | Pop-up: SST | Pass |
| Payment | What does Rounding mean? (x8) | Pop-up: Rounding | Pass |
| Pick the sale | 14717 7 Oct 2026, 7:59 pm Table 5 RM 24.50 Pi / 14716 Waiting 7 Oct 2026, 6:06 pm Takeaway RM / 14715 7 Oct 2026, 6:40 pm Takeaway RM 15.90 P and 57 more (x60) | E-invoice ... | Pass |
| Pop-up: Add supplier | Close / Cancel (x4) | Orders (main page) | Pass |
| Pop-up: Add supplier | Save supplier (x2) | Pop-up: Add supplier | Pass |
| Pop-up: Cancel e-invoice CN-#? | Close / No, keep it / Yes, cancel this e-invoice (x5) | CN-# | Pass |
| Pop-up: Cancel e-invoice CN-#? | Wrong buyer details / Wrong items or amounts / Issued by mistake (x5) | Pop-up: Cancel e-invoice CN-#? | Pass |
| Pop-up: Cancel e-invoice CN-#? | Wrong buyer details (x1) | Already selected, stays on Pop-up: Cancel e-invoice CN-#? | Pass |
| Pop-up: Cancel e-invoice EINV-#? | Close / No, keep it / Yes, cancel this e-invoice (x10) | EINV-# | Pass |
| Pop-up: Cancel e-invoice EINV-#? | Wrong buyer details / Wrong items or amounts / Issued by mistake (x10) | Pop-up: Cancel e-invoice EINV-#? | Pass |
| Pop-up: Cancel e-invoice EINV-#? | Wrong buyer details (x2) | Already selected, stays on Pop-up: Cancel e-invoice EINV-#? | Pass |
| Pop-up: Cancel order #? | Close / No, keep it / Yes, cancel the order (x3) | Order ... | Pass |
| Pop-up: Cancel the e-invoice first | Close / Go back (x2) | Receipt ... | Pass |
| Pop-up: Cancel the e-invoice first | Open the e-invoice (x1) | EINV-# | Pass |
| Pop-up: Clear this bill? | Close / No, keep it / Yes, clear the bill (x12) | Sell (main page) | Pass |
| Pop-up: Close order #? | Close / No, go back / Yes, close the order (x3) | Order ... | Pass |
| Pop-up: Daily sales for October # | Close (x6) | Sales by day, October # | Pass |
| Pop-up: Daily sales for October # | Download file / Copy all (x6) | Pop-up: Daily sales for October # | Pass |
| Pop-up: Delete Espresso? | Close / No, keep it (x4) | Espresso | Pass |
| Pop-up: Delete Espresso? | Yes, delete this dish (x2) | Menu and recipes | Pass |
| Pop-up: E-invoice | Close / Got it (x2) | Orders (main page) | Pass |
| Pop-up: E-invoice | Close / Got it (x2) | Enter supplier bill | Pass |
| Pop-up: E-invoice | Close / Got it (x2) | Bill ... | Pass |
| Pop-up: E-invoice | Close / Got it (x2) | Invoices (main page) | Pass |
| Pop-up: E-invoice CN-# as JSON (simplified UBL #.# layout) | Close (x6) | CN-# | Pass |
| Pop-up: E-invoice CN-# as JSON (simplified UBL #.# layout) | Download file / Copy all (x6) | Pop-up: E-invoice CN-# as JSON (simplified UBL #.# layout) | Pass |
| Pop-up: E-invoice EINV-# as JSON (simplified UBL #.# layout) | Close (x18) | EINV-# | Pass |
| Pop-up: E-invoice EINV-# as JSON (simplified UBL #.# layout) | Download file / Copy all (x18) | Pop-up: E-invoice EINV-# as JSON (simplified UBL #.# layout) | Pass |
| Pop-up: Edit Fresh milk | Close / Cancel / Save changes (x3) | Fresh milk | Pass |
| Pop-up: Edit Fresh milk | What does Minimum stock mean? (x1) | Pop-up: Minimum stock | Pass |
| Pop-up: Edit supplier ) | Close / Cancel / Save supplier (x3) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Pop-up: Fix the count: Fresh milk | Close / Cancel / Save the new count (x3) | Fresh milk | Pass |
| Pop-up: Food Rescue | Close / Got it (x2) | Waste (main page) | Pass |
| Pop-up: Food cost % | Close / Got it (x2) | Reports (main page) | Pass |
| Pop-up: Food cost % | Close / Got it (x2) | New dish | Pass |
| Pop-up: Held bills | Close / Back to the till / Table ? · RM 16.30 1 item · held at 7:50 pm B and 2 more (x16) | Sell (main page) | Pass |
| Pop-up: Help: Add item | Close / Close help / English and 2 more (x5) | Add item | Pass |
| Pop-up: Help: Add item | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Add item | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Alerts | Close / Close help / English and 2 more (x5) | Alerts | Pass |
| Pop-up: Help: Alerts | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Alerts | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Alerts | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Bill INV-P-# | Close / Close help / English and 2 more (x5) | Bill ... | Pass |
| Pop-up: Help: Bill INV-P-# | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Bill INV-P-# | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Business details | Close / Close help / English and 2 more (x5) | Business details | Pass |
| Pop-up: Help: Business details | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Business details | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Business details | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Count saved | Close / Close help / English and 2 more (x5) | Count saved | Pass |
| Pop-up: Help: Count saved | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Count saved | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Count stock | Close / Close help / English and 2 more (x5) | Count stock | Pass |
| Pop-up: Help: Count stock | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Count stock | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: E-invoice EINV-# | Close / Close help / English and 2 more (x5) | E-invoice ... | Pass |
| Pop-up: Help: E-invoice EINV-# | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: E-invoice EINV-# | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: E-invoice notes | Close / Close help / E-invoice notes and 3 more (x6) | E-invoice ... | Pass |
| Pop-up: Help: E-invoice notes | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: E-invoice notes | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: EINV-# | Close / Close help / English and 2 more (x5) | EINV-# | Pass |
| Pop-up: Help: EINV-# | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: EINV-# | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Enter supplier bill | Close / Close help / English and 2 more (x5) | Enter supplier bill | Pass |
| Pop-up: Help: Enter supplier bill | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Enter supplier bill | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Fresh milk | Close / Close help / English and 2 more (x5) | Fresh milk | Pass |
| Pop-up: Help: Fresh milk | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Fresh milk | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Goods received | Close / Close help / English and 2 more (x5) | Goods received | Pass |
| Pop-up: Help: Goods received | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Goods received | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Home | Close / Close help / Start the demo tour and 3 more (x6) | Home (main page) | Pass |
| Pop-up: Help: Home | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Invoices | Close / Close help / English and 2 more (x5) | Invoices (main page) | Pass |
| Pop-up: Help: Invoices | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Invoices | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Invoices | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Language | Close / Close help / English and 2 more (x5) | Language | Pass |
| Pop-up: Help: Language | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Language | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Language | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Lembah Fresh Dairy Sdn Bhd (demo) ) | Close / Close help / English and 2 more (x5) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Pop-up: Help: Lembah Fresh Dairy Sdn Bhd (demo) ) | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Lembah Fresh Dairy Sdn Bhd (demo) ) | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Limitations | Close / Close help / English and 2 more (x5) | Limitations | Pass |
| Pop-up: Help: Limitations | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Limitations | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Limitations | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Menu and recipes | Close / Close help / English and 2 more (x5) | Menu and recipes | Pass |
| Pop-up: Help: Menu and recipes | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Menu and recipes | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Menu and recipes | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: New dish | Close / Close help / English and 2 more (x5) | New dish | Pass |
| Pop-up: Help: New dish | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: New dish | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: New dish | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: New order | Close / Close help / English and 2 more (x5) | New order | Pass |
| Pop-up: Help: New order | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: New order | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Order # | Close / Close help / English and 2 more (x5) | Order ... | Pass |
| Pop-up: Help: Order # | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Order # | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Order sent | Close / Close help / English and 2 more (x5) | Order ... | Pass |
| Pop-up: Help: Order sent | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Order sent | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Orders | Close / Close help / English and 2 more (x5) | Orders (main page) | Pass |
| Pop-up: Help: Orders | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Orders | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Payment | Close / Close help / English and 2 more (x5) | Payment | Pass |
| Pop-up: Help: Payment | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Payment | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Pick the sale | Close / Close help / English and 2 more (x5) | Pick the sale | Pass |
| Pop-up: Help: Pick the sale | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Pick the sale | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Pick the sale | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Printable view | Close / Close help / English and 2 more (x5) | Printable view | Pass |
| Pop-up: Help: Printable view | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Printable view | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Receipt # | Close / Close help / English and 2 more (x5) | Receipt ... | Pass |
| Pop-up: Help: Receipt # | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Receipt # | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Receive goods | Close / Close help / English and 2 more (x5) | Receive goods | Pass |
| Pop-up: Help: Receive goods | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Receive goods | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Recent sales | Close / Close help / English and 2 more (x5) | Recent sales | Pass |
| Pop-up: Help: Recent sales | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Recent sales | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Reports | Close / Close help / English and 2 more (x5) | Reports (main page) | Pass |
| Pop-up: Help: Reports | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Reports | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Reports | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Sale done | Close / Close help / English and 2 more (x5) | Sale done | Pass |
| Pop-up: Help: Sale done | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Sale done | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Sales by day, October # | Close / Close help / English and 2 more (x5) | Sales by day, October # | Pass |
| Pop-up: Help: Sales by day, October # | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Sales by day, October # | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Sales by day, October # | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Sell | Close / Close help / English and 2 more (x5) | Sell (main page) | Pass |
| Pop-up: Help: Sell | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Sell | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Settings | Close / Close help / English and 2 more (x5) | Settings (main page) | Pass |
| Pop-up: Help: Settings | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Settings | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Settings | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Stock | Close / Close help / English and 2 more (x5) | Stock (main page) | Pass |
| Pop-up: Help: Stock | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Stock | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Tax and rounding | Close / Close help / English and 2 more (x5) | Tax and rounding | Pass |
| Pop-up: Help: Tax and rounding | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Tax and rounding | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Tax and rounding | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Waste | Close / Close help / English and 2 more (x5) | Waste (main page) | Pass |
| Pop-up: Help: Waste | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Waste | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Waste entries, October # | Close / Close help / English and 2 more (x5) | Waste entries, October # | Pass |
| Pop-up: Help: Waste entries, October # | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Waste entries, October # | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: Help: Waste entries, October # | E-invoice notes (x1) | E-invoice ... | Pass |
| Pop-up: Help: Waste history: Mushrooms | Close / Close help / English and 2 more (x5) | Waste history: ... | Pass |
| Pop-up: Help: Waste history: Mushrooms | Replay the welcome tour (x1) | Welcome tour step | Pass |
| Pop-up: Help: Waste history: Mushrooms | Start the demo tour (x1) | Home (main page) | Pass |
| Pop-up: How food cost is worked out | Close / Got it (x2) | Reports (main page) | Pass |
| Pop-up: Ingredients used by receipt # | Close (x2) | Sale done | Pass |
| Pop-up: Log this batch as waste? | Close / No, go back / Yes, log as waste (x3) | Stock (main page) | Pass |
| Pop-up: Log this batch as waste? | Close / No, go back / Yes, log as waste (x3) | Fresh milk | Pass |
| Pop-up: Minimum stock | Close / Got it (x2) | Stock (main page) | Pass |
| Pop-up: Minimum stock | Close / Got it (x2) | Add item | Pass |
| Pop-up: Offer Lettuce for rescue | Close / Cancel / Kind Kitchen KL (demo partner) Made-up partne and 2 more (x5) | Stock (main page) | Pass |
| Pop-up: Offer Lettuce for rescue | Close / Cancel / Kind Kitchen KL (demo partner) Made-up partne and 2 more (x25) | Waste (main page) | Pass |
| Pop-up: Remove this waste entry? | Close / No, keep it / Yes, remove the entry (x3) | Waste history: ... | Pass |
| Pop-up: Reset all demo data? | Close / No, keep my data (x2) | Settings (main page) | Pass |
| Pop-up: Reset all demo data? | Yes, reset everything (x1) | Home (main page) | Pass |
| Pop-up: SST | Close / Got it (x2) | Sell (main page) | Pass |
| Pop-up: Service charge | Close / Got it (x2) | Payment | Pass |
| Pop-up: Service charge | Close / Got it (x2) | Tax and rounding | Pass |
| Pop-up: TIN | Close / Got it (x2) | E-invoice ... | Pass |
| Pop-up: TIN | Close / Got it (x2) | Business details | Pass |
| Pop-up: TIN ) | Close / Got it (x2) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Pop-up: Unique ID | Close / Got it (x2) | EINV-# | Pass |
| Pop-up: Use oldest first | Close / Got it (x2) | Fresh milk | Pass |
| Pop-up: Void receipt ... | Close / No, keep the sale / Yes, void this sale (x10) | Receipt ... | Pass |
| Pop-up: Void receipt ... | Keyed in by mistake (nothing was made) Ingred / Test sale Ingredients go back into stock. / Customer cancelled (food was already made) In (x10) | Pop-up: Void receipt ... | Pass |
| Pop-up: Void receipt ... | Keyed in by mistake (nothing was made) Ingred (x2) | Already selected, stays on Pop-up: Void receipt #? | Pass |
| Pop-up: Waste log for October # | Close (x6) | Reports (main page) | Pass |
| Pop-up: Waste log for October # | Download file / Copy all (x12) | Pop-up: Waste log for October # | Pass |
| Pop-up: Waste log for October # | Close (x6) | Waste entries, October # | Pass |
| Pop-up: Who is using the app? | Close / Owner / Manager Sees everything: sales, stock / Cashier Sees the till only: take orders, take / Kitchen / Store staff Sees stock, deliveries  (x115) | Home (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Stock (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Orders (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Waste (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Receive goods | Pass |
| Pop-up: Who is using the app? | Close (x1) | Count stock | Pass |
| Pop-up: Who is using the app? | Close (x1) | New order | Pass |
| Pop-up: Who is using the app? | Close (x1) | Add item | Pass |
| Pop-up: Who is using the app? | Close (x1) | Fresh milk | Pass |
| Pop-up: Who is using the app? | Close (x2) | Order ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Waste history: ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Count saved | Pass |
| Pop-up: Who is using the app? | Close (x1) | Enter supplier bill | Pass |
| Pop-up: Who is using the app? | Close (x1) | Bill ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Sell (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Goods received | Pass |
| Pop-up: Who is using the app? | Close (x1) | Recent sales | Pass |
| Pop-up: Who is using the app? | Close (x1) | Payment | Pass |
| Pop-up: Who is using the app? | Close (x1) | Receipt ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Sale done | Pass |
| Pop-up: Who is using the app? | Close (x2) | E-invoice ... | Pass |
| Pop-up: Who is using the app? | Close (x1) | Reports (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | EINV-# | Pass |
| Pop-up: Who is using the app? | Close (x1) | Invoices (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Settings (main page) | Pass |
| Pop-up: Who is using the app? | Close (x1) | Sales by day, October # | Pass |
| Pop-up: Who is using the app? | Close (x1) | Waste entries, October # | Pass |
| Pop-up: Who is using the app? | Close (x1) | Printable view | Pass |
| Pop-up: Who is using the app? | Close (x1) | Pick the sale | Pass |
| Pop-up: Who is using the app? | Close (x1) | Business details | Pass |
| Pop-up: Who is using the app? | Close (x1) | Tax and rounding | Pass |
| Pop-up: Who is using the app? | Close (x1) | Menu and recipes | Pass |
| Pop-up: Who is using the app? | Close (x1) | Alerts | Pass |
| Pop-up: Who is using the app? | Close (x1) | Limitations | Pass |
| Pop-up: Who is using the app? | Close (x1) | Language | Pass |
| Pop-up: Who is using the app? | Close (x1) | New dish | Pass |
| Pop-up: Who is using the app? ) | Close (x1) | Lembah Fresh Dairy Sdn Bhd (demo) | Pass |
| Pop-up: Who is using the app? ) | Owner / Manager Sees everything: sales, stock / Cashier Sees the till only: take orders, take / Kitchen / Store staff Sees stock, deliveries  (x3) | Home (main page) | Pass |
| Pop-up: ☕ Espresso | Close / Cancel / Add to bill · RM 8.00 / Add to bill · RM 11.00 (x48) | Sell (main page) | Pass |
| Pop-up: ☕ Espresso | Extra coffee shot +RM 3.00 / Vanilla syrup +RM 1.50 (x32) | Pop-up: ☕ Espresso | Pass |
| Printable view | Print or save as PDF (x1) | Printable view | Pass |
| Receipt ... | Issue e-invoice for this sale (x2) | E-invoice ... | Pass |
| Receipt ... | Print / Stop waiting for an e-invoice / Customer will ask for an e-invoice later (x5) | Receipt ... | Pass |
| Receipt ... | Void this sale (x2) | Pop-up: Void receipt ... | Pass |
| Receipt ... | Open its e-invoice (x1) | EINV-# | Pass |
| Receipt ... | Void this sale (x1) | Pop-up: Cancel the e-invoice first | Pass |
| Receive goods | Order #106 · Roti Rumah Bakery Supply (demo)  / Order #107 · Pasar Pagi Produce (demo) 5 item / Pick another order and 3 more (x12) | Receive goods | Pass |
| Receive goods | Confirm goods received (x1) | Goods received | Pass |
| Receive goods | Back (x1) | New order | Pass |
| Receive goods | Next (x1) | Waste (main page) | Pass |
| Recent sales | New sale (x1) | Sell (main page) | Pass |
| Recent sales | Today / Yesterday / 5 Oct (x3) | Recent sales | Pass |
| Recent sales | 14716 6:06 pm Takeaway DuitNow QR RM 35.00 Wa / 14715 6:40 pm Takeaway Card RM 15.90 Paid Ope / 14714 6:17 pm Takeaway DuitNow QR RM 59.35 Pa and 67 more (x70) | Receipt ... | Pass |
| Reports (main page) | End tour / October 2026 / September 2026 / August 2026 (x4) | Reports (main page) | Pass |
| Reports (main page) | Back / Rescued instead of binned 0 kg Open Food Resc (x2) | Waste (main page) | Pass |
| Reports (main page) | Next (x1) | E-invoice ... | Pass |
| Reports (main page) | Copy waste log as spreadsheet (x1) | Pop-up: Waste log for October # | Pass |
| Reports (main page) | Copy daily sales as spreadsheet (x1) | Pop-up: Daily sales for October # | Pass |
| Reports (main page) | Sales (with tax) RM 12,276.60 528 bills · see (x1) | Sales by day, October # | Pass |
| Reports (main page) | Food cost 24.0% RM 2,622.67 of ingredients ·  (x1) | Pop-up: How food cost is worked out | Pass |
| Reports (main page) | Waste RM 70.27 4.35 kg · see every entry › (x1) | Waste entries, October # | Pass |
| Reports (main page) | Cream cheese 0.74 kg RM 25.30 History › / Yogurt 1.1 kg RM 13.15 History › / Turkey ham 0.35 kg RM 11.17 History › and 3 more (x6) | Waste history: ... | Pass |
| Reports (main page) | What does Food cost % mean? (x1) | Pop-up: Food cost % | Pass |
| Sale done | End tour / Customer will ask for an e-invoice later (x2) | Sale done | Pass |
| Sale done | Back (x1) | Payment | Pass |
| Sale done | Next (x1) | Fresh milk | Pass |
| Sale done | See what was used (x1) | Pop-up: Ingredients used by receipt # | Pass |
| Sale done | New sale (x1) | Sell (main page) | Pass |
| Sale done | Issue e-invoice for this sale (x1) | E-invoice ... | Pass |
| Sale done | View receipt (x1) | Receipt ... | Pass |
| Sale done | Back to Home (x1) | Home (main page) | Pass |
| Sales by day, October # | Copy as spreadsheet (x1) | Pop-up: Daily sales for October # | Pass |
| Sell (main page) | End tour / All / Coffee and 28 more (x221) | Sell (main page) | Pass |
| Sell (main page) | Back (x1) | Home (main page) | Pass |
| Sell (main page) | Next / Go to payment · RM 14.85 (x3) | Payment | Pass |
| Sell (main page) | Today's sales (x8) | Recent sales | Pass |
| Sell (main page) | ☕ Espresso Code 101 · has options RM 8.00 (x8) | Pop-up: ☕ Espresso | Pass |
| Sell (main page) | ☕ Americano Code 102 · has options RM 9.00 (x8) | Pop-up: ☕ Americano | Pass |
| Sell (main page) | ☕ Latte Code 103 · has options RM 12.00 (x8) | Pop-up: ☕ Latte | Pass |
| Sell (main page) | ☕ Cappuccino Code 104 · has options RM 12.00 (x8) | Pop-up: ☕ Cappuccino | Pass |
| Sell (main page) | ☕ Flat White Code 105 · has options RM 12.00 (x8) | Pop-up: ☕ Flat White | Pass |
| Sell (main page) | ☕ Mocha Code 106 · has options RM 14.00 (x8) | Pop-up: ☕ Mocha | Pass |
| Sell (main page) | ☕ Caramel Latte Code 107 · has options RM 14. (x8) | Pop-up: ☕ Caramel Latte | Pass |
| Sell (main page) | ☕ Gula Melaka Latte Code 108 · has options RM (x8) | Pop-up: ☕ Gula Melaka Latte | Pass |
| Sell (main page) | 🧊 Iced Long Black Code 109 · has options RM  (x8) | Pop-up: 🧊 Iced Long Black | Pass |
| Sell (main page) | 🍵 Matcha Latte Code 201 · has options RM 14. (x8) | Pop-up: 🍵 Matcha Latte | Pass |
| Sell (main page) | 🍫 Hot Chocolate Code 202 · has options RM 12 (x8) | Pop-up: 🍫 Hot Chocolate | Pass |
| Sell (main page) | 🫖 Teh Tarik Special Code 203 · has options R (x8) | Pop-up: 🫖 Teh Tarik Special | Pass |
| Sell (main page) | 🍋 Lemon Honey Soda Code 204 · has options RM (x8) | Pop-up: 🍋 Lemon Honey Soda | Pass |
| Sell (main page) | 🥤 Limau Kasturi Cooler Code 205 · has option (x8) | Pop-up: 🥤 Limau Kasturi Cooler | Pass |
| Sell (main page) | 🍳 Big Breakfast Code 301 · has options RM 26 (x8) | Pop-up: 🍳 Big Breakfast | Pass |
| Sell (main page) | 🥑 Avocado Toast Code 302 · has options RM 19 (x8) | Pop-up: 🥑 Avocado Toast | Pass |
| Sell (main page) | 🍞 Scrambled Eggs on Toast Code 304 · has opt (x8) | Pop-up: 🍞 Scrambled Eggs on Toast | Pass |
| Sell (main page) | 🍛 Nasi Lemak Ayam Code 307 · has options RM  (x8) | Pop-up: 🍛 Nasi Lemak Ayam | Pass |
| Sell (main page) | 🍔 Chicken Burger Code 401 · has options RM 2 (x8) | Pop-up: 🍔 Chicken Burger | Pass |
| Sell (main page) | 🍔 Beef Burger Code 402 · has options RM 26.0 (x8) | Pop-up: 🍔 Beef Burger | Pass |
| Sell (main page) | 🍝 Mushroom Aglio Olio Code 405 · has options (x8) | Pop-up: 🍝 Mushroom Aglio Olio | Pass |
| Sell (main page) | 🍝 Prawn Aglio Olio Code 406 · has options RM (x8) | Pop-up: 🍝 Prawn Aglio Olio | Pass |
| Sell (main page) | 🍝 Tomato Chicken Pasta Code 407 · has option (x8) | Pop-up: 🍝 Tomato Chicken Pasta | Pass |
| Sell (main page) | 🍚 Nasi Goreng Kampung Code 408 · has options (x8) | Pop-up: 🍚 Nasi Goreng Kampung | Pass |
| Sell (main page) | 🥗 Garden Salad Code 409 · has options RM 15. (x8) | Pop-up: 🥗 Garden Salad | Pass |
| Sell (main page) | Dine-in / Takeaway (x8) | Already selected, stays on Sell (main page) | Pass |
| Sell (main page) | What does SST mean? (x8) | Pop-up: SST | Pass |
| Sell (main page) | Held bills (0) / Held bills (1) (x8) | Pop-up: Held bills | Pass |
| Sell (main page) | What does Service charge mean? (x2) | Pop-up: Service charge | Pass |
| Sell (main page) | What does Rounding mean? (x4) | Pop-up: Rounding | Pass |
| Sell (main page) | Clear bill (x4) | Pop-up: Clear this bill? | Pass |
| Settings (main page) | Business details Name, address, TIN and regis (x1) | Business details | Pass |
| Settings (main page) | Tax, service charge and rounding The percenta (x1) | Tax and rounding | Pass |
| Settings (main page) | Menu and recipes Add, change or delete dishes (x1) | Menu and recipes | Pass |
| Settings (main page) | Alerts When to warn about food that is close  (x1) | Alerts | Pass |
| Settings (main page) | E-invoice notes The LHDN rules this demo foll (x1) | E-invoice ... | Pass |
| Settings (main page) | Limitations What is pretend in this demo and  (x1) | Limitations | Pass |
| Settings (main page) | Language · Bahasa · 语言 English, Bahasa Melayu (x1) | Language | Pass |
| Settings (main page) | Reset demo data (x1) | Pop-up: Reset all demo data? | Pass |
| Stock (main page) | Count stock (x4) | Count stock | Pass |
| Stock (main page) | Add item (x4) | Add item | Pass |
| Stock (main page) | All items (60) / Low (4) / Expiring soon (6) (x9) | Stock (main page) | Pass |
| Stock (main page) | What does Minimum stock mean? (x3) | Pop-up: Minimum stock | Pass |
| Stock (main page) | Fresh milk 5 L 12 L In 4 days 11 Oct Lembah F (x3) | Fresh milk | Pass |
| Stock (main page) | Oat milk 10.22 L 4 L In 58 days 4 Dec Lembah  (x2) | Oat milk | Pass |
| Stock (main page) | Whipping cream 2.92 L 2 L In 7 days 14 Oct Le (x2) | Whipping cream | Pass |
| Stock (main page) | Butter 3.52 kg 2 kg In 44 days 20 Nov Lembah  (x2) | Butter | Pass |
| Stock (main page) | Cheddar slices 3.55 kg 1.5 kg In 30 days 6 No (x2) | Cheddar slices | Pass |
| Stock (main page) | Mozzarella 3.21 kg 1.5 kg In 21 days 28 Oct L (x2) | Mozzarella | Pass |
| Stock (main page) | Yogurt 3.34 kg 2 kg In 7 days 14 Oct Lembah F (x2) | Yogurt | Pass |
| Stock (main page) | Eggs 119.5 pieces 60 pieces In 19 days 26 Oct (x2) | Eggs | Pass |
| Stock (main page) | Cream cheese 1.68 kg 1 kg In 25 days 1 Nov Le (x2) | Cream cheese | Pass |
| Stock (main page) | Lettuce 4.2 kg 2 kg Tomorrow 8 Oct Pasar Pagi / Lettuce (x3) | Lettuce | Pass |
| Stock (main page) | Tomato 5.22 kg 3 kg In 4 days 11 Oct Pasar Pa (x2) | Tomato | Pass |
| Stock (main page) | Cucumber 4.53 kg 2 kg In 4 days 11 Oct Pasar  (x2) | Cucumber | Pass |
| Stock (main page) | Onion 5.88 kg 3 kg In 30 days 6 Nov Pasar Pag (x2) | Onion | Pass |
| Stock (main page) | Garlic 2.15 kg 1 kg In 43 days 19 Nov Pasar P (x2) | Garlic | Pass |
| Stock (main page) | Chilli 1.2 kg 0.5 kg In 8 days 15 Oct Pasar P (x2) | Chilli | Pass |
| Stock (main page) | Lemon 29.46 pieces 15 pieces In 8 days 15 Oct (x2) | Lemon | Pass |
| Stock (main page) | Limau kasturi 1.88 kg 1 kg In 3 days 10 Oct P (x2) | Limau kasturi | Pass |
| Stock (main page) | Banana 6.79 kg 3 kg In 3 days 10 Oct Pasar Pa (x2) | Banana | Pass |
| Stock (main page) | Avocado 6 pieces 10 pieces In 3 days 10 Oct P (x3) | Avocado | Pass |
| Stock (main page) | Mushrooms 2.18 kg 1.5 kg In 3 days 10 Oct Pas (x2) | Mushrooms | Pass |
| Stock (main page) | Spinach 2.1 kg 1 kg In 2 days 9 Oct Pasar Pag / Spinach (x3) | Spinach | Pass |
| Stock (main page) | Potato 12.21 kg 5 kg In 26 days 2 Nov Pasar P (x2) | Potato | Pass |
| Stock (main page) | Mixed berries (frozen) 3.67 kg 2 kg In 175 da (x2) | Mixed berries (frozen) | Pass |
| Stock (main page) | Mango 4.89 kg 2 kg In 3 days 10 Oct Pasar Pag (x2) | Mango | Pass |
| Stock (main page) | Sourdough loaf 12.8 loaves 6 loaves Tomorrow  / Sourdough loaf (x3) | Sourdough loaf | Pass |
| Stock (main page) | Croissant (frozen dough) 14 pieces 30 pieces  (x3) | Croissant (frozen dough) | Pass |
| Stock (main page) | Burger bun 39.93 pieces 20 pieces In 3 days 1 (x2) | Burger bun | Pass |
| Stock (main page) | Bagel 28.42 pieces 12 pieces In 3 days 10 Oct (x2) | Bagel | Pass |
| Stock (main page) | Tortilla wrap 32.95 pieces 20 pieces In 10 da (x2) | Tortilla wrap | Pass |
| Stock (main page) | Flour 11.69 kg 8 kg In 175 days 31 Mar Roti R (x2) | Flour | Pass |
| Stock (main page) | Sugar 11.14 kg 5 kg In 363 days 5 Oct Roti Ru (x2) | Sugar | Pass |
| Stock (main page) | Cocoa powder 2.44 kg 1 kg In 361 days 3 Oct R (x2) | Cocoa powder | Pass |
| Stock (main page) | Dark chocolate 2.22 kg 1.5 kg In 297 days 31  (x2) | Dark chocolate | Pass |
| Stock (main page) | Almond flakes 1.12 kg 0.5 kg In 179 days 4 Ap (x2) | Almond flakes | Pass |
| Stock (main page) | Coffee beans 2.5 kg 4 kg In 23 days 30 Oct Bi (x3) | Coffee beans | Pass |
| Stock (main page) | Matcha powder 0.58 kg 0.3 kg In 179 days 4 Ap (x2) | Matcha powder | Pass |
| Stock (main page) | Tea leaves 1.02 kg 0.5 kg In 360 days 2 Oct B (x2) | Tea leaves | Pass |
| Stock (main page) | Vanilla syrup 1.94 L 1 L In 360 days 2 Oct Bi (x2) | Vanilla syrup | Pass |
| Stock (main page) | Caramel sauce 1.58 L 1 L In 360 days 2 Oct Bi (x2) | Caramel sauce | Pass |
| Stock (main page) | Honey 1.87 kg 1 kg In 365 days 7 Oct Biji Hit (x2) | Honey | Pass |
| Stock (main page) | Gula melaka 1.75 kg 1 kg In 179 days 4 Apr Bi (x2) | Gula melaka | Pass |
| Stock (main page) | Soda water 25.47 L 10 L In 179 days 4 Apr Bij (x2) | Soda water | Pass |
| Stock (main page) | Orange juice 6.78 L 4 L In 4 days 11 Oct Biji (x2) | Orange juice | Pass |
| Stock (main page) | Rice 25.35 kg 10 kg In 364 days 6 Oct Kedai K (x2) | Rice | Pass |
| Stock (main page) | Pasta 8.29 kg 4 kg In 361 days 3 Oct Kedai Ke (x2) | Pasta | Pass |
| Stock (main page) | Coconut milk 6.81 L 3 L In 176 days 1 Apr Ked (x2) | Coconut milk | Pass |
| Stock (main page) | Cooking oil 11.36 L 5 L In 362 days 4 Oct Ked (x2) | Cooking oil | Pass |
| Stock (main page) | Olive oil 1.57 L 1 L In 362 days 4 Oct Kedai  (x2) | Olive oil | Pass |
| Stock (main page) | Sambal paste 3.31 kg 2 kg In 58 days 4 Dec Ke (x2) | Sambal paste | Pass |
| Stock (main page) | Ikan bilis 1.73 kg 1 kg In 117 days 1 Feb Ked (x2) | Ikan bilis | Pass |
| Stock (main page) | Peanuts 1.91 kg 1 kg In 117 days 1 Feb Kedai  (x2) | Peanuts | Pass |
| Stock (main page) | Tomato pasta sauce 7.49 kg 3 kg In 235 days 3 (x2) | Tomato pasta sauce | Pass |
| Stock (main page) | Mayonnaise 2.46 kg 1.5 kg In 119 days 3 Feb K (x2) | Mayonnaise | Pass |
| Stock (main page) | Chicken breast 10 kg 5 kg Tomorrow 8 Oct Ayam / Chicken breast (x3) | Chicken breast | Pass |
| Stock (main page) | Beef patty 47.77 pieces 20 pieces In 3 days 1 (x2) | Beef patty | Pass |
| Stock (main page) | Smoked salmon 2.24 kg 1 kg In 5 days 12 Oct A (x2) | Smoked salmon | Pass |
| Stock (main page) | Tuna (canned) 3.36 kg 1.5 kg In 363 days 5 Oc (x2) | Tuna (canned) | Pass |
| Stock (main page) | Prawns 3.15 kg 1.5 kg In 2 days 9 Oct Ayam &  / Prawns (x4) | Prawns | Pass |
| Stock (main page) | Turkey ham 1.84 kg 1 kg In 7 days 14 Oct Ayam (x2) | Turkey ham | Pass |
| Stock (main page) | Chicken sausage 34.36 pieces 20 pieces In 11  (x2) | Chicken sausage | Pass |
| Stock (main page) | Expiring soon (6) / Low (4) / All items (60) (x3) | Already selected, stays on Stock (main page) | Pass |
| Stock (main page) | Offer for rescue (x1) | Pop-up: Offer Lettuce for rescue | Pass |
| Stock (main page) | Log as waste (x6) | Pop-up: Log this batch as waste? | Pass |
| Stock (main page) | Offer for rescue (x1) | Pop-up: Offer Sourdough loaf for rescue | Pass |
| Stock (main page) | Offer for rescue (x1) | Pop-up: Offer Chicken breast for rescue | Pass |
| Stock (main page) | Offer for rescue (x1) | Pop-up: Offer Spinach for rescue | Pass |
| Stock (main page) | Offer for rescue (x2) | Pop-up: Offer Prawns for rescue | Pass |
| Tax and rounding | Add a service charge to dine-in bills / Also add it to takeaway bills / Charge SST (only if the outlet is registered  and 2 more (x5) | Tax and rounding | Pass |
| Tax and rounding | What does Service charge mean? (x2) | Pop-up: Service charge | Pass |
| Tax and rounding | What does SST mean? (x2) | Pop-up: SST | Pass |
| Tax and rounding | What does Rounding mean? (x2) | Pop-up: Rounding | Pass |
| Waste (main page) | See what is expiring soon (x10) | Stock (main page) | Pass |
| Waste (main page) | Waste log / Food Rescue / Expired and 10 more (x75) | Waste (main page) | Pass |
| Waste (main page) | Today, 7:38 pm Mushrooms 0.6 kg Expired Added / Today, 7:38 pm Banana 1.5 kg Expired Added au / 4 Oct, 3:30 pm Chicken sausage 1 piece Overpr and 51 more (x400) | Waste history: ... | Pass |
| Waste (main page) | Waste log / Food Rescue / Expired (x14) | Already selected, stays on Waste (main page) | Pass |
| Waste (main page) | What does Food Rescue mean? (x5) | Pop-up: Food Rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Lettuce for rescue | Pass |
| Waste (main page) | Offer for rescue (x10) | Pop-up: Offer Sourdough loaf for rescue | Pass |
| Waste (main page) | Offer for rescue (x10) | Pop-up: Offer Chicken breast for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Spinach for rescue | Pass |
| Waste (main page) | Offer for rescue (x10) | Pop-up: Offer Prawns for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Limau kasturi for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Banana for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Avocado for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Mushrooms for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Mango for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Burger bun for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Bagel for rescue | Pass |
| Waste (main page) | Offer for rescue (x5) | Pop-up: Offer Beef patty for rescue | Pass |
| Waste (main page) | Back to Home (x2) | Home (main page) | Pass |
| Waste (main page) | Back (x1) | Receive goods | Pass |
| Waste (main page) | Next (x1) | Reports (main page) | Pass |
| Waste entries, October # | Copy as spreadsheet (x1) | Pop-up: Waste log for October # | Pass |
| Waste entries, October # | 7 Oct Mushrooms 0.6 kg Expired 0.6 kg RM 10.8 / 7 Oct Banana 1.5 kg Expired 1.5 kg RM 8.25 Hi / 4 Oct Chicken sausage 1 piece Overproduced 0. and 4 more (x7) | Waste history: ... | Pass |
| Waste history: ... | Open this item in Stock (x1) | Mushrooms | Pass |
| Waste history: ... | Remove entry (x1) | Pop-up: Remove this waste entry? | Pass |
| Welcome tour step | Skip the tour / Finish (x6) | Home (main page) | Pass |
| Welcome tour step | Next / Back (x8) | Welcome tour step | Pass |

## Menu editor test

| Check | Result |
|---|---|
| Saving an empty dish shows what is missing | Pass |
| New dish saved with price, new group, recipe and options | Pass |
| The new group shows as a tab on the till | Pass |
| Selling the new dish took 0.5 lemon off the stock | Pass |
| Changing the price and removing an ingredient is saved | Pass |
| Deleting removes the dish and returns to the menu list | Pass |
| Undo brings the deleted dish back | Pass |
| A deleted starter dish (Latte) is gone from the till | Pass |
| No console errors | Pass |

## Flow test

A second script acted like a person: it typed and clicked through one full day of work and checked the numbers.

| Check | Result |
|---|---|
| Dine-in RM21.00: service charge 2.10, SST 1.39, 24.49 rounds to RM24.50 | Pass |
| Takeaway RM21.00: no service charge, SST 1.26, 22.26 rounds to RM22.25 | Pass |
| Subtotal + service charge + SST + rounding always equals the total, ending in 0 or 5 sen | Pass |
| With SST and rounding switched off, RM7.00 stays RM7.00 | Pass |
| "Go to payment" is locked, with a hint, until the table number is typed | Pass |
| "Confirm payment" is locked until enough cash is entered | Pass |
| Sale: RM20.00 + 2.00 service charge + 1.32 SST = 23.32, rounded to RM23.30. Change from RM50 is RM26.70 | Pass |
| Stock dropped by the recipes: milk 0.2 L, coffee beans 0.018 kg, 1 croissant, butter 0.005 kg | Pass |
| Payment lands on the "Sale done" screen | Pass |
| Empty buyer form shows the red box listing what is missing | Pass |
| "Fix it" jumps to the missing field | Pass |
| Submit unlocks once the details are complete | Pass |
| Status shows Submitted while waiting | Pass |
| E-invoice is Valid: 22.00 before tax + 1.32 tax - 0.02 rounding = RM23.30, same as the receipt | Pass |
| Sale is linked to its e-invoice and left out of the combined e-invoice | Pass |
| A fresh e-invoice can be cancelled | Pass |
| Cancelling asks for a reason first | Pass |
| E-invoice cancelled, and the sale is free to get a new one | Pass |
| An e-invoice older than 72 hours cannot be cancelled, and the page says why | Pass |
| Credit note issued for the old e-invoice and Valid | Pass |
| A wrong TIN comes back Invalid with a plain explanation | Pass |
| After fixing and sending again it is Valid | Pass |
| Combined e-invoice: buyer General Public, TIN EI00000000010, code 004, total equals last month's walk-in sales (RM51969.05) | Pass |
| Combined e-invoice is Valid and the reminder is cleared | Pass |
| "Fresh milk is low" opens an order with milk already filled in (36 L) | Pass |
| Order saved as "Sent, waiting for delivery" | Pass |
| Part delivery: milk +34 L in a new batch, order stays open as "Part received" | Pass |
| "Save waste log" is locked until an item and a reason are picked | Pass |
| Waste log: tomato down 0.5 kg, RM3.00, and the month's waste in Reports went up by RM3.00 | Pass |
| Undo puts the tomato back in stock | Pass |
| Reports: this month's sales went up by exactly the sale (RM23.30) | Pass |
| Void: receipt marked Void and the day's sales drop by that amount | Pass |
| A batch past its expiry date was moved to the waste log automatically | Pass |
| No console errors during the whole flow | Pass |
