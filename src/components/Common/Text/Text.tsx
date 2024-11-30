type TextProps = {
  content: string;
};

function Text({ content }: TextProps) {
  return (
    <div css={{ width: '100%' }}>
      {content.split('\n').map((line, index) => {
        return (
          <span key={index} css={{ width: '100%', wordBreak: 'break-all' }}>
            {line}
            <br />
          </span>
        );
      })}
    </div>
  );
}

export default Text;
