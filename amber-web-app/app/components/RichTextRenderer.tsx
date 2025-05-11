interface RichTextRendererProps {
  type: "heading" | "paragraph" | "list";
  children: TextNode[] | ListItemNode[];
  level?: number;
  format?: "unordered" | "ordered";
}

interface HeaderProps {
  level: number;
  children: TextNode[];
}

interface ParagraphProps {
  children: TextNode[];
}

interface ListProps {
  format: "unordered" | "ordered";
  children: ListItemNode[];
}

interface ListItemsProps {
  children: ListItemNode[];
}

interface TextProps {
  children: TextNode[];
}

interface TextNode {
  text: string;
  bold?: boolean;
}

interface ListItemNode {
  children: TextNode[];
}

export const RichTextRenderer = ({ type, children, level, format }: RichTextRendererProps) => {
  return (
    <>
      {(() => {
        switch (type) {
          case "heading":
            return <Header level={level!} children={children as TextNode[]} />;
          case "paragraph":
            return <Paragraph children={children as TextNode[]} />;
          case "list":
            return <List format={format!} children={children as ListItemNode[]} />;
        }
      })()}
    </>
  );
};

const Header = ({ level, children }: HeaderProps) => {
  return (
    <>
      {(() => {
        switch (level) {
          case 1:
            return (
              <h1 className="text-4xl text-amber-500 font-vollkorn mt-8 mb-2">
                <Text children={children} />
              </h1>
            );
          case 2:
            return (
              <h2 className="text-3xl text-amber-500 font-vollkorn mt-8 mb-2">
                <Text children={children} />
              </h2>
            );
          case 3:
            return (
              <h3 className="text-2xl text-amber-500 font-vollkorn mt-8 mb-2">
                <Text children={children} />
              </h3>
            );
          case 4:
            return (
              <h4 className="text-1xl text-amber-500 font-vollkorn mt-8 mb-2">
                <Text children={children} />
              </h4>
            );
          case 5:
            return (
              <h5 className="text-lg text-amber-500 font-vollkorn mt-8 mb-2">
                <Text children={children} />
              </h5>
            );
        }
      })()}
    </>
  );
};

export const Paragraph = ({ children }: ParagraphProps) => {
  return (
    <>
      {(() => (
        <p className="font-poppins my-6">
          <Text children={children} />
        </p>
      ))()}
    </>
  );
};

const List = ({ format, children }: ListProps) => {
  return (
    <>
      {(() => {
        switch (format) {
          case "unordered":
            return (
              <ul className="list-disc list-inside mx-4">
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

const ListItems = ({ children }: ListItemsProps) => {
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

const Text = ({ children }: TextProps) => {
  return (
    <>
      {children.map((item, index) =>
        item.bold ? (
          <b key={index}>{item.text}</b>
        ) : (
          <span key={index}>{item.text}</span>
        )
      )}
    </>
  );
};
