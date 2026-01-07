import { Suspense } from "react";
import { Countdown } from "@/components/Countdown";
import { PRList } from "@/components/PRList";
import { IE6Layout } from "@/components/IE6Layout";
import { IE6Styles } from "@/components/IE6Styles";

export default function Home() {
  return (
    <IE6Layout>
      <IE6Styles />
      <Countdown />
      
      <div style={{ marginTop: '20px' }}>
        <table width="100%" border="2" cellPadding="15" cellSpacing="0" style={{ borderColor: '#ff00ff' }}>
          <tbody>
            <tr>
              <td bgcolor="#ffccff" align="center">
                <font size="5" color="#0000ff" face="Comic Sans MS">
                  <b>
                    <span className="blink-text">✨ OPEN PRS - VOTE TO MERGE ✨</span>
                  </b>
                </font>
              </td>
            </tr>
            <tr>
              <td bgcolor="#ffffcc" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Suspense
                    fallback={
                      <table width="90%" border="1" cellPadding="10" bgcolor="#ccffcc" style={{ maxWidth: '600px' }}>
                        <tbody>
                          <tr>
                            <td align="center">
                              <font color="#006600" face="Arial">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='16' cy='16' r='12' fill='%23ffff00' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E" alt="Loading..." style={{ animation: 'spin 2s linear infinite' }} />
                                <br />
                                <b>Loading PRs... Please Wait...</b>
                              </font>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    }
                  >
                    <div style={{ width: '100%', maxWidth: '600px' }}>
                      <PRList />
                    </div>
                  </Suspense>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </IE6Layout>
  );
}
