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
        <table width="100%" border={2} cellPadding={15} cellSpacing={0} style={{ borderColor: '#ff00ff' }}>
          <tbody>
            <tr>
              <td style={{ backgroundColor: '#ffccff', textAlign: 'center' }}>
                <span style={{ fontSize: '24px', color: '#0000ff', fontFamily: 'Comic Sans MS' }}>
                  <b>
                    <span className="blink-text">✨ OPEN PRS - VOTE TO MERGE ✨</span>
                  </b>
                </span>
              </td>
            </tr>
            <tr>
              <td style={{ backgroundColor: '#ffffcc', padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <Suspense
                    fallback={
                      <table width="90%" border={1} cellPadding={10} style={{ backgroundColor: '#ccffcc', maxWidth: '600px' }}>
                        <tbody>
                          <tr>
                            <td style={{ textAlign: 'center' }}>
                              <span style={{ color: '#006600', fontFamily: 'Arial' }}>
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Ccircle cx='16' cy='16' r='12' fill='%23ffff00' stroke='%23000' stroke-width='2'/%3E%3C/svg%3E" alt="Loading..." style={{ animation: 'spin 2s linear infinite' }} />
                                <br />
                                <b>Loading PRs... Please Wait...</b>
                              </span>
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
