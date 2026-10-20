# GoodBite for Business (B2B demo)

A demo web app for small cafes, bakeries and restaurants. One app to sell at the till, track stock and expiry dates, order from suppliers, log waste, and prepare e-invoices.

**Everything in it is pretend.** The cafe, suppliers, prices, sales and tax numbers are made up. Nothing is sent to LHDN, a bank, or a supplier.

The old household app is untouched. It is still `index.html` in the main Goodbite folder. This new app lives in the `business` folder.



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
  - **Food rescue:** not in any dish, or expires today and most will be left. These rows have an "Offer for rescue" button.
- How it works: the app takes each item's average use per day over the last 14 days and assumes older batches are used first. Whatever is not likely to be used by the expiry date is "at risk". It is a rough guide.
- **Print** works from the file or GitHub Pages. **Copy to share** gives plain text for WhatsApp or email, in the app's language.
- Demo figures on 19 Oct (2-day view): 7 batches, RM 190.85 at risk out of RM 269.80.

**Also fixed (20 Oct):** on a phone, "View bill" on the till now hides the menu and shows the bill straight away. Before, the bill was at the bottom of a long page.

## 5-minute demo script



## Limitations

**Pretend (simulated)**
- E-invoices are not sent to LHDN MyInvois. Statuses, IDs and QR pictures are made up. Nothing is digitally signed.
- Payments. Cash, card, DuitNow QR and e-wallet buttons do not move money.
- Sending orders to suppliers. Nothing is emailed or messaged.
- Food Rescue. The partners are invented and nobody is told about an offer.
- Staff roles. There are no passwords. Anyone can switch role.
- Scanning. The Scan button shows how reading a delivery order, receipt, barcode or market photo would work, using sample pictures. Nothing is read from a camera.
- Suggested expiry dates come from typical shelf lives, not from reading the pack. Staff must check each one.

**Estimated or made up**
- Every price, cost, weight and sales figure. The 2 months of history are generated by the app.
- The kg per piece or loaf used to turn waste into kilograms.
- Suggested order amounts (minimum stock plus the last 14 days of use). A rough guide only.
- The tax rates in Settings are common examples, not advice.
- Value at risk and the suggested actions in the expiring-soon report (they also use the last 14 days of use).

**What a real product would still need**
- A server and database, so data is shared between devices.
- Real logins and permissions.
- MyInvois API registration, a digital certificate for signing, and handling of LHDN's real replies.
- A licensed payment partner for card, DuitNow QR and e-wallets.
- Receipt printer, cash drawer and barcode scanner support.
- Real text and photo recognition for delivery orders, receipts and market photos, and reading the dates printed on packs.
- A way to keep working when the internet is down.
- Checks by an accountant on tax, rounding and e-invoice rules.
- Interviews and testing with real cafe owners. Nobody from a cafe has tried this yet.


## Choices made without asking

- Service charge applies to dine-in only (can be changed in Settings).
- Rounding to 5 sen applies to every payment type, not only cash.
- SST is worked out line by line, so the receipt and the e-invoice always match to the sen.
- Only the last 3 days of receipts are kept one by one. Older days are kept as a daily total. This keeps the app small enough for the browser.
- "Draft" is the app's own word for an e-invoice that has not been sent. LHDN's four statuses are Submitted, Valid, Invalid, Cancelled.
- A buyer TIN ending in 404 is always rejected. This is how the demo shows an "Invalid" result.
- The Cashier can start an e-invoice from a sale, even though the Cashier menu only shows Home and Sell.
- Voiding a sale asks why. "Keyed in by mistake" puts the ingredients back. "Food was already made" does not.
- Food given to a rescue partner leaves the stock but is not counted as waste.
- The look is light only (no dark mode), to match the first GoodBite prototype.
- Dish codes for new dishes start at 601. A new dish with no recipe can be saved, but the app warns that it will not reduce stock.
- Language is one setting for the whole device, not per staff member.

## Files

- `index.html` - the whole app in one file. This is the only file the browser needs.
- `source/` - the same code split into smaller files (`src/`), plus `build.py` which joins them into `dist/index.html`.
- `source/test/` - the scripts that click through the app (`audit.js`, `flow.js`, and `scan.js` for the 19 Oct features). They need Node and Playwright.
- `button-audit.md` - the result of clicking every button in every role (English), plus one run in Chinese and one in Malay. This file is from 7 Oct. The 19 Oct results are in `handoff-note.md`.
- `button-audit-full.csv` - the same, one row per click.
