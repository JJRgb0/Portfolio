import type { Architecture as Diagram } from "@/content/types";

function DiagramSvg({
  diagram,
  mobile,
}: {
  diagram: Diagram;
  mobile: boolean;
}) {
  const arrow = mobile ? "seta-mobile" : "seta-desktop";
  const textSize = mobile ? 9 : 12;

  return (
    <svg
      className={mobile ? "architecture-mobile" : "architecture-desktop"}
      viewBox={mobile ? "0 0 320 491" : "0 0 768 338"}
      aria-hidden="true"
    >
      <defs>
        <marker
          id={arrow}
          viewBox="0 0 8 8"
          refX="7"
          refY="4"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path
            d="M1 1l5 3-5 3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.1"
          />
        </marker>
      </defs>
      {diagram.connections.map((connection) => (
        <path
          key={connection.desktop}
          d={mobile ? connection.mobile : connection.desktop}
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray={connection.dashed ? "4 3" : undefined}
          markerStart={
            connection.direction === "both" ? `url(#${arrow})` : undefined
          }
          markerEnd={`url(#${arrow})`}
        />
      ))}
      {diagram.nodes.map((node) => {
        const [x, y] = mobile ? node.mobileCenter : node.center;
        const width = mobile
          ? node.details.length > 1
            ? 212
            : 140
          : Math.max(
              166,
              ...node.details.map((detail) => detail.length * 7.4 + 22),
            );
        const height = 64 + (node.details.length - 1) * 16;

        return (
          <g key={node.title} transform={`translate(${x} ${y})`}>
            <rect
              x={-width / 2}
              y={-height / 2}
              width={width}
              height={height}
              rx="2"
              className="diagram-box"
            />
            <text
              textAnchor="middle"
              y={
                node.details.length === 3
                  ? -22
                  : node.details.length === 2
                    ? -11
                    : -4
              }
              className="diagram-title"
              fontSize={mobile ? 13 : 16}
            >
              {node.title}
            </text>
            {node.details.map((detail, index) => (
              <text
                key={detail}
                textAnchor="middle"
                y={
                  (node.details.length === 3
                    ? -2
                    : node.details.length === 2
                      ? 8
                      : 14) +
                  index * (mobile ? 13 : 17)
                }
                className="diagram-detail"
                fontSize={textSize}
              >
                {detail}
              </text>
            ))}
          </g>
        );
      })}
    </svg>
  );
}

export function Architecture({
  diagram,
  index,
}: {
  diagram: Diagram;
  index: string;
}) {
  return (
    <figure className="architecture">
      <div
        className="architecture-board"
        role="img"
        aria-label={diagram.description}
      >
        <DiagramSvg diagram={diagram} mobile={false} />
        <DiagramSvg diagram={diagram} mobile />
      </div>
      <figcaption className="mono">
        <span>Fig. {index}</span> — {diagram.caption}
      </figcaption>
    </figure>
  );
}
