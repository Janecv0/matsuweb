interface MarkdownBlockProps {
  content: string;
}

function parseLine(line: string) {
  if (line.startsWith("### ")) {
    return <h3>{line.replace("### ", "")}</h3>;
  }

  if (line.startsWith("## ")) {
    return <h2>{line.replace("## ", "")}</h2>;
  }

  if (line.startsWith("- ")) {
    return <li>{line.replace("- ", "")}</li>;
  }

  return <p>{line}</p>;
}

export function MarkdownBlock({ content }: MarkdownBlockProps) {
  const lines = content.split("\n");
  const chunks: string[][] = [];
  let current: string[] = [];

  for (const line of lines) {
    if (!line.trim()) {
      if (current.length) {
        chunks.push(current);
        current = [];
      }
      continue;
    }
    current.push(line);
  }

  if (current.length) {
    chunks.push(current);
  }

  return (
    <div className="prose-content">
      {chunks.map((group, groupIndex) => {
        const listOnly = group.every((line) => line.startsWith("- "));

        if (listOnly) {
          return (
            <ul key={`group-${groupIndex}`}>
              {group.map((line, lineIndex) => (
                <li key={`line-${groupIndex}-${lineIndex}`}>{line.replace("- ", "")}</li>
              ))}
            </ul>
          );
        }

        return group.map((line, lineIndex) => (
          <div key={`line-${groupIndex}-${lineIndex}`}>{parseLine(line)}</div>
        ));
      })}
    </div>
  );
}
