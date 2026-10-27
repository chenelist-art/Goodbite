# Stox (B2B demo, formerly GoodBite for Business)

A demo web app for small Chinese and seafood restaurants (small F&B SMEs). It tracks stock and expiry dates, keeps food cost on target, orders from suppliers and logs waste. Restaurants can keep their own POS (Stox Stock) or use the Stox till (Stox All-in-One).

**Everything in it is pretend.** The restaurant, suppliers, prices, sales and tax numbers are made up. Nothing is sent to a POS, LHDN, a bank, or a supplier.

The old household app is untouched. It is still `index.html` in the main Goodbite folder. This app lives in the `business` folder.

## How to open it

- **Easiest:** open the Claude link (the published artifact).
- **From the file:** double-click `business/index.html`. It opens in your browser. It needs internet only for the fonts.
- **GitHub Pages:** the app is in the `business` folder of the `stox` repo, at `chenelist-art.github.io/stox/business/`.

Your changes are saved in that browser only. To start fresh: **Settings > Reset demo data**.

If the dates look old when you open it on another day, press **Refresh demo data** on Home.

## Version 2 (25 Oct 2026): after the interviews and the supervisor's BMC comments

The supervisor said small restaurants care about stock, expiry dates and cost control more than food waste, and asked us to keep the scope small. The 5 owner interviews said the same. So this version leads with stock and food cost, and waste is a side benefit.

**The demo outlet is now a restaurant.** "Ombak Biru Seafood Restaurant (demo)" in Puchong: 37 dishes (steamed fish, butter prawns, kam heong lala, sweet and sour pork, char kuey teow and so on), 58 ingredients, 6 suppliers (seafood, wet-market vegetables, meat, tofu and noodles, dry goods, drinks), open 11 am to 10 pm. The save key changed, so a browser that opened the old cafe demo starts fresh with the restaurant.

**New features (each one answers a supervisor point):**
1. **Count by photo** (Stock > Count stock, or Scan > Shelf photo). Pick a shelf (seafood chiller, meat chiller, vegetable rack, egg and noodle shelf, dry store, drinks fridge), "take a photo", and the app fills in the count. Each amount is marked "From photo" for staff to check before saving. Simulated.
2. **Works with your POS** (Settings > Plan and POS link). Pick Feed Me, Coox, Loyverse, StoreHub, or upload a sales file. "Allow access" asks for no password. Then match the POS's dish names (such as "CKT" or "LIMAU ICE") to Stox dishes once. 5 names the app is not sure about must be checked first. After connecting, the plan becomes **Stox Stock**: the Stox till, e-invoices and the Cashier view are hidden, and Home shows "Sync POS sales". Each sync brings in sample sales and takes every matched dish's recipe off the stock. Disconnecting brings the till back. Simulated.
3. **Usage check** (Stock > Usage check). Every stock count keeps the difference between what the app expected and what was counted. The usage check adds those up over 7 or 14 days and compares them with what the recipes used. Differences under 10% are "normal range", because portions vary (Sizzling Hot Plate's point). In the demo, prawns and lala come up short (check portion sizes), and rice comes up over (the recipe says more than the cooks use).
4. **Dishes to push today** (Home card, Stock, the expiring-soon report). Dishes that use food likely to be left over in the next 3 days, with the reason. "Add to today's specials" puts a star on the till.
5. **May run out today** (same page). Ingredients that will run out today at the last 14 days' pace (eggs and mud crab in the demo), with "Order more" and a tap to mark a dish **sold out**. Sold-out dishes are greyed out on the till for the rest of the day (Confirm Sedap's point: selling out is their real problem).
6. **Food cost target and weekly summary.** Settings > Alerts and targets has a food cost target (30% to 45%, the demo starts at 40%, like Chuan Shifu). Home and Reports show this week's food cost against it. Reports > Weekly summary shows food cost per week, waste, value at risk, usage check flags, dishes to push and what may run out, with "Copy to share" for the team chat.
7. **Get set up in 3 steps** on the owner's Home: count stock with a photo, connect your POS or use the Stox till, and check the recipes of your top 5 dishes. "Chat on WhatsApp" and "Book a free video call" replace the old set-up visit (both simulated). The card can be hidden, and brought back from Settings.

**Taken out to keep the scope small:** Food Rescue (the tab, the "Offer for rescue" buttons and the report's food rescue action). The expiring-soon report now suggests "Staff meal" instead. E-invoicing is still in the app (with the Stox till) but is no longer part of the demo tour.

**Tests on 25 Oct:** flow 34 of 34, scan 44 of 44, menu editor 9 of 9, and the new `test/v2.js` 50 of 50. Button audit (clicks every button in every role): 26,180 clicks, 0 failed. Not tried by a real restaurant yet.

## Finding your way around

- The **menu** is always on screen (left side on a laptop or tablet, bottom on a phone).
- **Viewing as** at the top switches between Owner, Cashier and Kitchen staff. The menu gets shorter for staff.
- The **green button** is always the main thing to do on a page. Red buttons undo or delete something and always ask first.
- **Help** explains the page you are on in 3 lines.
- **Demo tour** walks you through the presentation one step at a time. Press Next and it takes you to the right screen.

## Added on 7 Oct (second round)

**1. The owner can change the menu.** Settings > Menu and recipes.
- **Add dish**: name, group on the till (or make a new group), price, picture, options, and the recipe (ingredients and amounts).
- **Change a dish**: tap its row. Everything can be edited.
- **Delete dish**: red button at the bottom of the dish page. It asks first, and you can Undo. Old receipts keep the dish.
- A new dish shows on the till straight away, and each sale takes its recipe off the stock.

**2. Three languages.** Settings > Language, or the Help button on any page (so staff can switch too).
- English, Bahasa Melayu, 中文 (Simplified Chinese). The choice is saved on that device.
- Menus, buttons, messages, help, tours, built-in dish and ingredient names are all translated.
- Not translated on purpose: names you type yourself (a new dish, a supplier), made-up company names, dates, the copy-as-spreadsheet text, and the e-invoice JSON.
- **The Malay and Chinese wording was written by Claude. No native speaker has checked it.** Please read through it, or ask a friend to, before you present in those languages.

## Added on 19 Oct (third round, the supervisor's three features)

**1. Scan: one button, three ways.** On Home (Owner and Kitchen), Stock, Orders and Receive goods. Everything is simulated with sample pictures. Nothing is read from a real camera.
- **Delivery order or supplier invoice:** pick which paper is in front of the camera (any open order, or a sample delivery with no order in the app). The app reads every line still to come. Saving receives the order, the same as typing it in.
- **Supermarket receipt or barcode:** a sample receipt with 7 lines. The plastic bag is left out as not food. "KICAP MANIS" is not in the item list, so it is left out unless staff match it to an item. In barcode mode, pick one of 4 sample packs. You can scan several in a row.
- **Wet-market photo:** a pretend photo of chicken, kangkung, prawns, or a blurry one. The app guesses the item. "Not right?" opens big picture buttons. A blurry photo shows them straight away.
- **Every way ends on "Check and confirm".** The expiry date is only a **suggestion**, and the screen says where it came from. For a barcode it is read from the pack. Fresh food gets its typical life: chicken 2 days, prawns 1, kangkung and spinach 3, lettuce 4, tomato 5. Everything else gets its usual shelf life, with a note to check the pack. "Add to stock" stays locked until staff tap **Date checked** on every line. Changing the date also counts. Past dates are refused. You can undo the save.
- New ingredient: **Kangkung** (not used in any dish). The demo now has 61 ingredients. The other demo numbers stay the same.

**2. Sort by date.** "Newest first / Oldest first" chips (for stock: "Expiring soonest first / latest first"). They are on Stock, Orders, Supplier bills, the Waste log and each item's waste history, Waste entries and Sales by day in Reports, Invoices, and Recent sales. There is no sort on the till, Settings, the menu editor or Home. Each list remembers its own choice. Stock now opens with the soonest expiry first.

**3. Expiring-soon report.** Open it from Stock, from Reports, or from the Home "expiring" card (which now shows the RM at risk).
- For each batch that expires in the next 1, 2, 3, 5 or 7 days, it shows the amount, the expiry date, how much will probably be left over, the **RM value at risk**, and a **suggested action** with a one-line reason:
  - **Use first:** little or nothing will be left.
  - **Use in today's special:** names the dishes that use it most.
  - **Discount:** expires very soon and a lot will be left.
  - **Food rescue:** not in any dish, or expires today and most will be left. (Replaced by **Staff meal** in version 2.)
- How it works: the app takes each item's average use per day over the last 14 days and assumes older batches are used first. Whatever is not likely to be used by the expiry date is "at risk". It is a rough guide.
- **Print** works from the file or GitHub Pages. **Copy to share** gives plain text for WhatsApp or email, in the app's language.
- Demo figures on 19 Oct (2-day view): 7 batches, RM 190.85 at risk out of RM 269.80.

## 5-minute demo script (version 2, 16 steps)

Press **Demo tour** at the top and follow the dark box. Press **Next** to move on. Allow about 6 minutes. To stay within 5, skip steps 7 and 8.

| # | Screen | What to say and do |
|---|--------|--------------------|
| 1 | Home (Owner) | "This is what the owner sees each morning." Point at the 3 set-up steps, then the To do cards. |
| 2 | Dishes to push today | "These dishes use food that will probably be left over, like lala and chicken. One tap puts them on the specials board. Below: eggs and crab may run out today." |
| 3 | Sell (Cashier) | Tap Butter Prawns, Garlic Kailan and Steamed Rice twice. Type table 5. |
| 4 | Payment | "Service charge, SST and 5 sen rounding are worked out." Confirm payment. |
| 5 | Sale done | "The sale took each recipe off the stock." Press "See what was used". |
| 6 | Stock > Tiger prawns (Kitchen) | "Stock is kept by batch. The oldest batch is used first." |
| 7 | New order (Owner) | "The 'Ginger is low' card opened this order, already filled in." |
| 8 | Receive goods (Kitchen) | "Staff check amounts and expiry dates against the order." |
| 9 | Scan (Kitchen) | "Restaurants buy at the wet market with no delivery order. Staff take a photo." Tap "Date checked". |
| 10 | Count by photo (Kitchen) | "Staff photograph the seafood chiller. The app fills in the count. Prawns and lala are short." |
| 11 | Usage check (Owner) | "Prawns and lala keep coming up short against the recipes, so the owner checks portions with the cook. Under 10% is normal." |
| 12 | Waste (Kitchen) | "Logging waste takes three taps." |
| 13 | Expiring-soon report (Owner) | "What is about to expire, in ringgit, and what to do: use first, today's special, discount or staff meal." |
| 14 | Plan and POS link (Owner) | "Most restaurants already have a POS. They keep it. They match its dish names once, and every sale takes the recipe off the stock." |
| 15 | Weekly summary (Owner) | "Once a week: food cost against the target, waste, and what to check. Copy it to the team chat." |
| 16 | Limitations | "Here is what is simulated and what a real product still needs." |

Tip: if a step looks wrong because you clicked around, press **Next** or **Back** in the dark box. It puts the right screen back.

## What changed from the brief (please read)

1. **Most small outlets do not have to issue e-invoices today.** LHDN's guideline dated 30 Aug 2026 exempts businesses with yearly turnover under RM3 million. LHDN's own timeline web page still says RM1 million (last updated Dec 2025). The app follows the newer guideline and says so. Either way, a small restaurant is under the line. So e-invoicing is a "ready when you grow, or when a company customer asks" feature, not a legal must-have for the target customers.
2. **Most small restaurants do not charge SST either.** Customs says food and drink outlets register only above RM1.5 million a year. The rate is 6% for food and drink. The demo restaurant charges it so you can show the maths, but it can be switched off in Settings.
3. **Cancel window is 72 hours** from the time LHDN accepts the e-invoice. After that it needs a credit note. The app works this way.
4. **Walk-in sales go into one combined e-invoice** per month, due within 7 days after the month ends, with buyer "General Public" and TIN EI00000000010. The app has this.
5. **Version 2 menu:** 37 dishes, 58 ingredients, 6 suppliers, about 2 months of history (the cafe had 44 dishes and 61 ingredients).
6. **The file is `business/index.html`**, not `index.html`, so the old household prototype is not overwritten.
7. **Printing and file downloads** only work when the app is opened from the file or GitHub Pages. Inside the Claude preview, those buttons are replaced with "Copy" boxes, because the preview blocks printing and downloads.

All sources are inside the app: **Invoices > E-invoice notes**.

## Limitations

**Pretend (simulated)**
- The POS link. Feed Me, Coox, Loyverse and StoreHub are not really connected. "Sync sales now" brings in sample sales. No password is ever asked for.
- Scanning and shelf photos. Sample pictures only. Nothing is read from a camera.
- Suggested expiry dates come from typical shelf lives, not from reading the pack. Staff must check each one.
- E-invoices are not sent to LHDN MyInvois. Statuses, IDs and QR pictures are made up. Nothing is digitally signed.
- Payments. Cash, card, DuitNow QR and e-wallet buttons do not move money.
- Sending orders to suppliers. Nothing is emailed or messaged.
- WhatsApp chat and video call help. Nothing is sent and no call is booked.
- Staff roles. There are no passwords. Anyone can switch role.

**Estimated or made up**
- Every price, cost, weight and sales figure. The 2 months of history and the past stock counts are generated by the app.
- Suggested order amounts, "may run out today" and "dishes to push today" (they use the last 14 days of use). A rough guide only.
- The usage check. It adds up past count differences. The 10% normal range is our own rule of thumb.
- Value at risk and the suggested actions in the expiring-soon report.
- The food cost target choices and the tax rates in Settings are common examples, not advice.

**What a real product would still need**
- A server and database, so data is shared between devices.
- Real links to each POS, using the access each POS company gives partners. We have not checked yet which POS companies allow this.
- Real text and photo recognition for delivery orders, receipts, market photos and shelf photos.
- Real logins and permissions.
- A way to keep working when the internet is down.
- MyInvois API registration and a licensed payment partner, if the Stox till is kept.
- Checks by an accountant on tax, rounding and e-invoice rules.
- A real pilot. Interviews with 5 restaurant owners shaped this version, but none has used it day to day yet.

**Not confirmed** (also listed in the app)
- Whether service tax is charged on top of the service charge. It is a switch, on by default.
- How a service charge should appear on an e-invoice. The demo shows it as its own line.
- The 5 sen rounding rule was not checked against a Bank Negara source.
- The business activity code (56101) and item code (022 Others) are placeholders.
- The end date of LHDN's penalty grace period was only seen on non-official sites, so it is left out.

## Choices made without asking

- Service charge applies to dine-in only (can be changed in Settings).
- Rounding to 5 sen applies to every payment type, not only cash.
- SST is worked out line by line, so the receipt and the e-invoice always match to the sen.
- Only the last 3 days of receipts are kept one by one. Older days are kept as a daily total. This keeps the app small enough for the browser.
- "Draft" is the app's own word for an e-invoice that has not been sent. LHDN's four statuses are Submitted, Valid, Invalid, Cancelled.
- A buyer TIN ending in 404 is always rejected. This is how the demo shows an "Invalid" result.
- The Cashier can start an e-invoice from a sale, even though the Cashier menu only shows Home and Sell.
- Voiding a sale asks why. "Keyed in by mistake" puts the ingredients back. "Food was already made" does not.
- Connecting a POS switches the plan to Stox Stock and hides the till, e-invoices and the Cashier view. Disconnecting switches back.
- A dish marked sold out is greyed out for the rest of that day only. It is back on sale the next day.
- Photo counts are rounded (to 0.1 kg under 10 kg, 0.5 kg above, whole pieces), so staff check them.
- The usage check flags a difference only if it is over 10% of what the recipes used and worth RM5 or more.
- The look is light only (no dark mode), to match the first Stox prototype.
- Dish codes for new dishes start at 601. A new dish with no recipe can be saved, but the app warns that it will not reduce stock.
- Language is one setting for the whole device, not per staff member.

## Files

- `index.html` - the whole app in one file. This is the only file the browser needs.
- `source/` - the same code split into smaller files (`src/`), plus `build.py` which joins them into `dist/index.html`.
- `source/test/` - the scripts that click through the app (`audit.js`, `flow.js`, `scan.js`, `dish.js`, and `v2.js` for the 25 Oct features). They need Node and Playwright. `tr9.txt` has the version 2 Malay and Chinese; run `python3 test/mkdict.py` then `python3 build.py` after editing it.
- `button-audit.md` - the result of clicking every button in every role (English), plus one run in Chinese and one in Malay. This file is from 7 Oct. Later results are in `handoff-note.md`.
- `button-audit-full.csv` - the same, one row per click.
