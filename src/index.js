import fs from 'fs';
import path from 'path';
import hazedumper from '../hazedumper/csgo.min.json';
import ClassMember, { Visibility } from 'models/php/classmember.model';
import Class from 'models/php/class.model';
import Namespace from 'models/php/namespace.model';

const netvars = Object.keys(hazedumper.netvars).map(key => {
  return new ClassMember(
    key,
    '0x' + hazedumper.netvars[key].toString(16),
    true,
    Visibility.PUBLIC,
    false,
    true
  );
});

const signatures = Object.keys(hazedumper.signatures).map(key => {
  return new ClassMember(
    key,
    '0x' + hazedumper.signatures[key].toString(16),
    true,
    Visibility.PUBLIC,
    false,
    true
  );
});

const clsNetvars = new Class('netvars', netvars);
const clsSignatures = new Class('signatures', signatures);
const nsHazedumper = new Namespace('hazedumper', [clsNetvars, clsSignatures]);

const outDir = path.join(__dirname, '..', 'out');
const outFile = path.join(__dirname, '..', 'out', 'csgo.php');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
if (fs.existsSync(outFile)) fs.unlinkSync(outFile);
fs.writeFileSync(outFile, '<?php\n\n' + nsHazedumper.toPHP());
