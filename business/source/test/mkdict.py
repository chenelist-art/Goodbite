import re
st=open('test/static.txt',encoding='utf8').read().split('\n')
dy=[l.split('\t') for l in open('test/dynamic.txt',encoding='utf8').read().split('\n')]
ws=lambda s:re.sub(r'\s+',' ',s).strip()
out=[];seen={}
def add(en,ms,zh):
    en=ws(en)
    if en in seen: return
    seen[en]=1;out.append(f"{en} || {ws(ms)} || {ws(zh)}")
for f in ['test/tr6.txt','test/tr8.txt','test/tr7.txt']:
    for l in open(f,encoding='utf8'):
        l=l.rstrip('\n')
        if not l.strip() or l.startswith('//'): continue
        a=l.split(' || ');assert len(a)==3,l
        add(*a)
for f in ['test/tr1.txt','test/tr2.txt','test/tr3.txt','test/tr4.txt','test/tr5.txt']:
    for l in open(f,encoding='utf8'):
        l=l.rstrip('\n')
        if not l.strip(): continue
        a=l.split(' || ');assert len(a)==3,l
        k=a[0].strip()
        if k=='D151': continue
        en=dy[int(k[1:])-1][1] if k.startswith('D') else st[int(k)-1]
        add(en,a[1],a[2])
print(len(out),'entries')
body='\n'.join(out).replace('\\','\\\\').replace('`','\\`').replace('${','\\${')
open('src/dict.js','w',encoding='utf8').write('i18nAdd(`'+body+'`);\n')
