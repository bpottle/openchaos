"use client";

export function WebCounter() {
  const count = 1337;

  // wtf was I thinking, don't increment the counter live, but... leave this here in case I want it later
  // useEffect(() => {
  //   const incrementCounter = () => {
  //     // Random delay between 3-7 seconds (3000-7000ms)
  //     const randomDelay = Math.floor(Math.random() * 4000) + 3000;
  //     
  //     setTimeout(() => {
  //       setCount((prev) => prev + 1);
  //       incrementCounter(); // Schedule next increment
  //     }, randomDelay);
  //   };

  //   incrementCounter();
  // }, []);

  // Format leading zeros
  const formattedCount = count.toString().padStart(6, "0");
  
  // Split for each "cell"
  const digits = formattedCount.split("");

  return (
    <div className="webcounter-container">
      <table 
        border={2} 
        cellPadding={5} 
        cellSpacing={0} 
        className="webcounter-table"
      >
        <tbody>
          <tr>
            <td 
              colSpan={6} 
              className="webcounter-header-cell"
            >
              <span className="webcounter-header-text">
                <span className="sparkle-glint">★</span> YOU ARE VISITOR NUMBER <span className="sparkle-glint sparkle-delay-3">★</span>
              </span>
            </td>
          </tr>
          <tr>
            {digits.map((digit, index) => (
              <td 
                key={index}
                className="webcounter-digit-cell"
              >
                <span className="webcounter-digit-text">
                  {digit}
                </span>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
