"use client"

export function StatsSection() {
  return (
    <div style={{ backgroundColor: 'white', padding: '50px 20px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '30px', fontWeight: 'bold', color: 'black', marginBottom: '16px' }}>
            AI-Powered Results
          </h2>
          <p style={{ color: '#666', maxWidth: '600px', margin: '0 auto' }}>
            Our system consistently outperforms industry standards,
            delivering exceptional results through automated intelligence.
          </p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          {/* Card 1 */}
          <div style={{ padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #eee', backgroundColor: 'white' }}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', display: 'inline-block', marginBottom: '16px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '8px' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold' }}>92</span>
              <span style={{ fontSize: '30px', fontWeight: 'bold', marginLeft: '4px' }}>%+</span>
            </div>
            <div style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>Deliverability Rate</div>
            <div style={{ color: '#666' }}>Messages that reach their target</div>
          </div>
          
          {/* Card 2 */}
          <div style={{ padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #eee', backgroundColor: 'white' }}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', display: 'inline-block', marginBottom: '16px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '8px' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold' }}>55</span>
              <span style={{ fontSize: '30px', fontWeight: 'bold', marginLeft: '4px' }}>%</span>
            </div>
            <div style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>Open Rate</div>
            <div style={{ color: '#666' }}>Industry avg: 20% for cold emails</div>
          </div>
          
          {/* Card 3 */}
          <div style={{ padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #eee', backgroundColor: 'white' }}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', display: 'inline-block', marginBottom: '16px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '8px' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold' }}>0.1</span>
              <span style={{ fontSize: '30px', fontWeight: 'bold', marginLeft: '4px' }}>%</span>
            </div>
            <div style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>Spam Complaint Rate</div>
            <div style={{ color: '#666' }}>Well below industry average</div>
          </div>
          
          {/* Card 4 */}
          <div style={{ padding: '32px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '1px solid #eee', backgroundColor: 'white' }}>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '8px', display: 'inline-block', marginBottom: '16px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '8px' }}>
              <span style={{ fontSize: '48px', fontWeight: 'bold' }}>24</span>
              <span style={{ fontSize: '30px', fontWeight: 'bold', marginLeft: '4px' }}>/7</span>
            </div>
            <div style={{ fontSize: '20px', fontWeight: '600', color: '#333', marginBottom: '4px' }}>Automation</div>
            <div style={{ color: '#666' }}>Always-on lead generation</div>
          </div>
        </div>
      </div>
    </div>
  );
} 