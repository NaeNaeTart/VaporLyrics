lines = open('c:\\Users\\PC\\Documents\\Projects\\Extensions\\Spicetify Extensions\\Vapor Lyrics\\src\\index.tsx', 'r', encoding='utf-8').read().split('\n')
import re
def clean(text):
    text = re.sub(r'".*?"', '""', text)
    text = re.sub(r"'.*?'", "''", text)
    text = re.sub(r'//.*', '', text)
    return text
    
btot = 0
ptot = 0
for i, line in enumerate(lines):
    if i < 800 or i > 1100: continue
    c = clean(line)
    b_diff = c.count('{') - c.count('}')
    p_diff = c.count('(') - c.count(')')
    btot += b_diff
    ptot += p_diff
    if btot != 0 or ptot != 0:
        print(f"{i+1}: p={ptot} b={btot} : {line.strip()}")
