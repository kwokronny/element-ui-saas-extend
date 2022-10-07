const mdContainer = require("markdown-it-container");
const fs = require("fs");

module.exports = (options) => {
  const { component = "demo-block" } = options;
  const componentName = component
    .replace(/^\S/, (s) => s.toLowerCase())
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase();
  return (md) => {
    md.use(mdContainer, "demo", {
      validate(params) {
        return params.trim().match(/^demo\s*(.*)$/);
      },
      render(tokens, idx) {
        const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
        if (tokens[idx].nesting === 1) {
          const description = m && m.length > 1 ? m[1] : "";
          const token = tokens[idx + 1].type === "fence" ? tokens[idx + 1] : "";
          let content = token.src
            ? fs.readFileSync(token.src, { encoding: "utf-8" })
            : token.content;
          // return `<div>${content}</div><div>`;
          const encodeOptionsStr = encodeURI(JSON.stringify(options));
          return `<${componentName} :options="JSON.parse(decodeURI('${encodeOptionsStr}'))">
            <template slot="demo"><!--pre-render-demo:${content}:pre-render-demo--></template>
            ${description ? `<div slot="description">${md.render(description).html}</div>` : ''}
            <template slot="source">
          `;
        }
        // return "</div>";
        return `</template></${componentName}>`;
      },
    });
  };
};
