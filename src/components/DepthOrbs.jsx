import './depth-orbs.scss';

const ORBS = [
    { color: 'blue', size: 'lg', top: '6%', left: '-4%' },
    { color: 'violet', size: 'md', top: '18%', right: '-6%' },
    { color: 'purple', size: 'sm', top: '32%', left: '18%' },
    { color: 'accent', size: 'md', top: '48%', right: '10%' },
    { color: 'blue-light', size: 'sm', top: '62%', left: '-2%' },
    { color: 'violet', size: 'lg', top: '76%', right: '-5%' },
    { color: 'warm', size: 'md', top: '88%', left: '22%' },
    { color: 'purple', size: 'sm', top: '96%', right: '16%' },
];

function DepthOrbs() {
    return (
        <div className="depth-orbs" aria-hidden="true">
            {ORBS.map((orb, index) => (
                <div
                    key={index}
                    className={`depth-orb depth-orb--${orb.color} depth-orb--${orb.size}`}
                    style={{
                        top: orb.top,
                        left: orb.left,
                        right: orb.right,
                    }}
                />
            ))}
        </div>
    );
}

export default DepthOrbs;
