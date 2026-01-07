import type { PullRequest } from "@/lib/github";

interface PRCardProps {
  pr: PullRequest;
  rank: number;
}

export function PRCard({ pr, rank }: PRCardProps) {
  return (
    <table 
      width="100%" 
      border={2}
      cellPadding={8}
      cellSpacing={0}
      style={{ 
        backgroundColor: rank === 1 ? "#ffff00" : "#ffffff",
        borderColor: rank === 1 ? "#ff0000" : "#0000ff",
        marginBottom: '10px',
        fontFamily: 'Comic Sans MS, cursive'
      }}
    >
      <tbody>
        <tr>
          <td style={{ backgroundColor: rank === 1 ? "#ffcc00" : "#ccccff", textAlign: 'center', width: '15%' }}>
            <span style={{ fontSize: '20px', color: rank === 1 ? "#ff0000" : "#0000ff", fontFamily: 'Comic Sans MS' }}>
              <b>#{pr.number}</b>
            </span>
            {rank === 1 && (
              <div style={{ marginTop: '5px' }}>
                <span style={{ fontSize: '14px', color: '#ff0000', fontFamily: 'Arial' }}>
                  <b>⭐ LEADING ⭐</b>
                </span>
              </div>
            )}
          </td>
          <td style={{ backgroundColor: rank === 1 ? "#ffffcc" : "#f0f0ff", padding: '10px' }}>
            <table width="100%" border={0} cellPadding={0} cellSpacing={0}>
              <tbody>
                <tr>
                  <td>
                    <span style={{ fontSize: '16px', fontFamily: 'Comic Sans MS', color: '#000000' }}>
                      <b>{pr.title}</b>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingTop: '5px' }}>
                    <span style={{ fontSize: '14px', fontFamily: 'Arial', color: '#666666' }}>
                      by <b>@{pr.author}</b>
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingTop: '8px' }}>
                    <a
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ 
                        color: '#0000ff', 
                        textDecoration: 'underline',
                        fontFamily: 'Arial',
                        fontSize: '12px'
                      }}
                    >
                      <b>[View &amp; Vote on GitHub →]</b>
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
          <td style={{ backgroundColor: rank === 1 ? "#ffcc00" : "#ccffcc", textAlign: 'center', width: '15%' }}>
            <span style={{ fontSize: '24px', fontFamily: 'Arial' }}>
              👍
            </span>
            <br />
            <span style={{ fontSize: '20px', color: rank === 1 ? "#ff0000" : "#006600", fontFamily: 'Comic Sans MS' }}>
              <b>{pr.votes}</b>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
