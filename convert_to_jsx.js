const fs = require('fs');

function processHtml(fileIn, fileOut, componentName) {
    let html = fs.readFileSync(fileIn, 'utf8');

    // Extract <main> content
    const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
    if (!mainMatch) {
        console.error('No <main> tag found in ' + fileIn);
        return;
    }
    let innerHtml = mainMatch[1];

    // Convert class to className
    innerHtml = innerHtml.replace(/class=/g, 'className=');
    // Avoid errors with style strings (e.g. style="font-variation-settings: 'FILL' 1;") -> remove them or convert to object
    innerHtml = innerHtml.replace(/style="[^"]*"/g, '');
    // Remove HTML Comments which crash React JSX returns
    innerHtml = innerHtml.replace(/<!--[\s\S]*?-->/g, '');

    // Self close elements: img, input, br, hr
    innerHtml = innerHtml.replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />');
    innerHtml = innerHtml.replace(/<input([^>]*?)(?<!\/)>/g, '<input$1 />');
    innerHtml = innerHtml.replace(/<br([^>]*?)(?<!\/)>/g, '<br$1 />');
    innerHtml = innerHtml.replace(/<hr([^>]*?)(?<!\/)>/g, '<hr$1 />');

    const componentStr = `/* eslint-disable @next/next/no-img-element, react/no-unescaped-entities, jsx-a11y/alt-text */
import React from 'react';

export default function ${componentName}() {
  return (
    <main className="bg-background min-h-screen text-on-background font-body pb-12">
      ${innerHtml}
    </main>
  );
}
`;

    fs.writeFileSync(fileOut, componentStr, 'utf8');
    console.log('Successfully generated ' + fileOut);
}

processHtml('/tmp/stitch_campus.html', 'app/campus-life/page.tsx', 'CampusLifePage');
processHtml('/tmp/stitch_about.html', 'app/about/page.tsx', 'AboutPage');
