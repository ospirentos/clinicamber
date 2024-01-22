export const RichTextRenderer = ({ type, children, level, format }) => {
  return (
    <>
      {(() => {
        switch (type) {
          case "heading":
            return <Header level={level} children={children} />;
          case "paragraph":
            return <Paragraph children={children} />;
          case "list":
            return <List format={format} children={children} />;
        }
      })()}
    </>
  );
};

const Header = ({ level, children }) => {
  return (
    <>
      {(() => {
        switch (level) {
          case 1:
            return (
              <h1 className="text-5xl">
                <Text children={children} />
              </h1>
            );
          case 2:
            return (
              <h2 className="text-4xl">
                <Text children={children} />
              </h2>
            );
          case 3:
            return (
              <h3 className="text-3xl">
                <Text children={children} />
              </h3>
            );
          case 4:
            return (
              <h4 className="text-2xl">
                <Text children={children} />
              </h4>
            );
          case 5:
            return (
              <h5 className="text-xl">
                <Text children={children} />
              </h5>
            );
        }
      })()}
    </>
  );
};

const Paragraph = ({ children }) => {
  return (
    <>
      {(() => (
        <p>
          <Text children={children} />
        </p>
      ))()}
    </>
  );
};

const List = ({ format, children }) => {
  return (
    <>
      {(() => {
        switch (format) {
          case "unordered":
            return (
              <ul className="list-disc list-inside">
                <ListItems children={children} />
              </ul>
            );
          case "ordered":
            return (
              <ol>
                <ListItems children={children} />
              </ol>
            );
        }
      })()}
    </>
  );
};

const ListItems = ({ children }) => {
  return (
    <>
      {(() => {
        return children.map((listItem, index) => (
          <li key={index}>
            <Text children={listItem.children} />
          </li>
        ));
      })()}
    </>
  );
};

const Text = ({ children }) => {
  return (
    <>
      {children.map((item, index) => (
        <span key={index}>
          {item.bold ? <b>{item.text}</b> : <>{item.text}</>}
        </span>
      ))}
    </>
  );
};
