import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const files = [
  { name: 'package.json', path: './package.json' },
  { name: 'index.html', path: './index.html' },
  { name: 'vite.config.ts', path: './vite.config.ts' },
  { name: 'tailwind.config.js', path: './tailwind.config.js' },
  { name: 'src/index.css', path: './src/index.css' },
  { name: 'src/main.tsx', path: './src/main.tsx' },
  { name: 'src/App.tsx', path: './src/App.tsx' },
  { name: 'src/components/Dashboard.tsx', path: './src/components/Dashboard.tsx' },
  { name: 'src/components/Sidebar.tsx', path: './src/components/Sidebar.tsx' },
  { name: 'src/components/ConsumptionChart.tsx', path: './src/components/ConsumptionChart.tsx' },
  { name: 'src/components/StatCard.tsx', path: './src/components/StatCard.tsx' },
  { name: 'src/components/InfoCard.tsx', path: './src/components/InfoCard.tsx' },
  { name: 'src/components/DeviceList.tsx', path: './src/components/DeviceList.tsx' },
];

let markdown = `# Documentation du Code - Application de Gestion Énergétique

## Table des matières
${files.map(f => `- [${f.name}](#${f.name.replace(/[/.]/g, '-')})`).join('\n')}

## Structure du projet

Cette application React utilise:
- Vite comme bundler
- TypeScript pour le typage
- Tailwind CSS pour le style
- Recharts pour les graphiques
- Lucide React pour les icônes

## Fichiers source

`;

for (const file of files) {
  try {
    const content = readFileSync(file.path, 'utf-8');
    markdown += `### ${file.name}
\`\`\`${file.path.endsWith('.tsx') ? 'typescript' : file.path.split('.').pop()}
${content}
\`\`\`

`;
  } catch (error) {
    console.error(`Erreur lors de la lecture de ${file.path}:`, error);
  }
}

writeFileSync('documentation.md', markdown);
console.log('Documentation générée avec succès dans documentation.md');