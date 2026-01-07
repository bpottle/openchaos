import type { PullRequest } from "@/lib/github";

interface PRCardProps {
  pr: PullRequest;
  rank: number;
}

export function PRCard({ pr, rank }: PRCardProps) {
  return (
    <table 
      width="100%" 
      border="2" 
      cellPadding="8" 
      cellSpacing="0" 
      bgcolor={rank === 1 ? "#ffff00" : "#ffffff"}
      style={{ 
        borderColor: rank === 1 ? "#ff0000" : "#0000ff",
        marginBottom: '10px',
        fontFamily: 'Comic Sans MS, cursive'
      }}
    >
      <tbody>
        <tr>
          <td bgcolor={rank === 1 ? "#ffcc00" : "#ccccff"} align="center" width="15%">
            <font size="4" color={rank === 1 ? "#ff0000" : "#0000ff"} face="Comic Sans MS">
              <b>#{pr.number}</b>
            </font>
            {rank === 1 && (
              <div style={{ marginTop: '5px' }}>
                <font size="2" color="#ff0000" face="Arial">
                  <b>⭐ LEADING ⭐</b>
                </font>
              </div>
            )}
          </td>
          <td bgcolor={rank === 1 ? "#ffffcc" : "#f0f0ff"} style={{ padding: '10px' }}>
            <table width="100%" border="0" cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td>
                    <font size="3" face="Comic Sans MS" color="#000000">
                      <b>{pr.title}</b>
                    </font>
                  </td>
                </tr>
                <tr>
                  <td style={{ paddingTop: '5px' }}>
                    <font size="2" face="Arial" color="#666666">
                      by <b>@{pr.author}</b>
                    </font>
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
          <td bgcolor={rank === 1 ? "#ffcc00" : "#ccffcc"} align="center" width="15%">
            <font size="5" face="Arial">
              👍
            </font>
            <br />
            <font size="4" color={rank === 1 ? "#ff0000" : "#006600"} face="Comic Sans MS">
              <b>{pr.votes}</b>
            </font>
          </td>
        </tr>
      </tbody>
    </table>
  );
}