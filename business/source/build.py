import sys,os
base=os.path.dirname(os.path.abspath(__file__))
rd=lambda n:open(os.path.join(base,'src',n),encoding='utf8').read()
js='\n'.join(rd(n) for n in ['core.js','data.js','ui.js','s_home_sell.js','s_stock_orders.js','s_waste_reports.js','s_inv_settings.js','i18n.js','dict.js','tour.js'])
def page(standalone):
    global js
    code=js if standalone else '\n'.join(l for l in js.split('\n') if not l.startswith('ACT.download='))
    body=f'''<title>GoodBite Business</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600&family=Nunito+Sans:opsz,wght@6..12,400;6..12,600;6..12,700;6..12,800&display=swap">
<style>
{rd('style.css')}</style>
<div id="app"><aside id="side" aria-label="Main menu"></aside><div id="main"><header id="top"></header><div id="demo" hidden></div><main id="scr" tabindex="-1"></main></div><nav id="bot" aria-label="Main menu"></nav></div>
<div id="modal" hidden></div><div id="toast" hidden></div><div id="tour" hidden></div>
<script>
const STANDALONE={'true' if standalone else 'false'};
{code}
</script>
'''
    if standalone:
        return '<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">\n<style>[hidden]{display:none!important}</style></head><body>\n'+body+'</body></html>\n'
    return body
os.makedirs(os.path.join(base,'dist'),exist_ok=True)
open(os.path.join(base,'dist','index.html'),'w',encoding='utf8').write(page(True))
open(os.path.join(base,'dist','artifact.html'),'w',encoding='utf8').write(page(False))
print('built',len(page(True)))
