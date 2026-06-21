import React from 'react'

const items = [
  { icon: '🕯️', label: 'Handcrafted in Kolkata' },
  { icon: '🌿', label: '100% Natural Wax' },
  { icon: '🚚', label: 'Pan-India Delivery' },
  { icon: '💬', label: 'Easy WhatsApp Enquiry' },
  { icon: '✨', label: 'Small Batch Poured' },
  { icon: '🎁', label: 'Gift Ready Packaging' },
  { icon: '🐝', label: 'Soy & Beeswax Blends' },
  { icon: '🌸', label: 'Premium Fragrance Oils' },
  { icon: '🏆', label: 'Premium Quality' },
  { icon: '❤️', label: 'Made with Love' },
]

const doubled = [...items, ...items]

export default function MarqueeStrip() {
  return (
    <div
      className="marquee-wrapper"
      aria-hidden="true"
      style={{
        overflow: 'hidden',
        background: '#FDF0EC',
        borderTop: '1px solid #E8DDD0',
        borderBottom: '1px solid #E8DDD0',
        height: '90px',
        paddingTop: '12px',
        paddingBottom: '12px',
        boxSizing: 'border-box',
      }}
    >
      {/* Track: flat flex row — items and dots are direct siblings so alignItems centres the dots */}
      <div
        className="marquee-track"
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'fit-content',
          height: '100%',
          animation: 'marquee 35s linear infinite',
        }}
      >
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            {/* Item: icon on top, text below */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                padding: '0 40px',
                whiteSpace: 'nowrap',
                flexShrink: 0,
              }}
            >
              <span style={{ fontSize: '24px', lineHeight: 1 }}>{item.icon}</span>
              <span
                style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#1A1208',
                  letterSpacing: '0.5px',
                  fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
                }}
              >
                {item.label}
              </span>
            </div>
            {/* Separator dot — direct flex sibling, vertically centred by track's alignItems */}
            <span
              style={{
                color: '#C8922A',
                fontSize: '16px',
                lineHeight: 1,
                flexShrink: 0,
              }}
            >
              ·
            </span>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
