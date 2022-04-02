import React, { useState } from "react";
import BaseHighlight, { defaultProps, Language } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import {
  Alert,
  Box,
  Button,
  chakra,
  ChakraComponent,
  Heading,
  HTMLChakraProps,
  Kbd,
  Link,
  useClipboard,
  useColorModeValue,
} from "@chakra-ui/react";
import { urlify } from "../common/urlify";

interface HighlightProps {
  codeString: string;
  language: Language;
  metastring?: string;
}

function Highlight({
  codeString,
  language,
  metastring,
  ...props
}: HighlightProps) {
  return (
    <BaseHighlight
      {...defaultProps}
      code={codeString}
      language={language}
      theme={theme}
      {...props}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <div data-language={language}>
          <pre className={className} style={style}>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line, key: i });
              return (
                <chakra.div px="5" whiteSpace="normal" {...lineProps}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </chakra.div>
              );
            })}
          </pre>
        </div>
      )}
    </BaseHighlight>
  );
}

const CopyButton = (props) => (
  <Button
    size="sm"
    position="absolute"
    textTransform="uppercase"
    colorScheme="cyan"
    fontSize="xs"
    height="24px"
    top={0}
    zIndex="1"
    right="1.25em"
    opacity="0.5"
    _hover={{ opacity: 1 }}
    {...props}
  />
);

const CodeContainer = (props) => (
  <Box padding="5" rounded="8px" my="8" bg="#011627" {...props} />
);

function CodeBlock(props) {
  const {
    className,
    live = true,
    manual,
    render,
    children,
    viewlines,
    ln,
    ...rest
  } = props;
  const [editorCode, setEditorCode] = useState(
    children && typeof children.trim === "function" ? children.trim() : ""
  );

  const language = className?.replace(/language-/, "");
  const { hasCopied, onCopy } = useClipboard(editorCode);

  return (
    <Box position="relative" zIndex="0">
      <CodeContainer px="0">
        <Highlight
          codeString={editorCode}
          language={language}
          metastring={ln}
        />
      </CodeContainer>
      <CopyButton top="4" onClick={onCopy}>
        {hasCopied ? "copied" : "copy"}
      </CopyButton>
    </Box>
  );
}

const Pre = (props) => <chakra.div my="2em" borderRadius="sm" {...props} />;

const Table = (props) => (
  <chakra.div overflowX="auto">
    <chakra.table textAlign="left" mt="32px" width="full" {...props} />
  </chakra.div>
);

const THead = (props) => (
  <chakra.th
    bg={useColorModeValue("gray.50", "whiteAlpha.100")}
    fontWeight="semibold"
    p={2}
    fontSize="sm"
    {...props}
  />
);

const TData = (props) => (
  <chakra.td
    p={2}
    borderTopWidth="1px"
    borderColor="inherit"
    fontSize="sm"
    whiteSpace="normal"
    {...props}
  />
);

const LinkedHeading = ({
  H,
  ...props
}: {
  H: ChakraComponent<"h1" | "h2" | "h3" | "h4" | "h5" | "h6">;
} & HTMLChakraProps<"h2">) => {
  const id = urlify(props.children as string);
  return (
    <H
      id={id}
      data-group
      mt="12"
      mb="6"
      fontWeight="bold"
      css={{ scrollMarginBlock: "6rem" }}
      {...props}
    >
      <span className="content">{props.children}</span>
      {id && (
        <Link
          aria-label="anchor"
          color="cyan.500"
          fontWeight="normal"
          outline="none"
          _focus={{ opacity: 1, boxShadow: "outline" }}
          opacity={0}
          _groupHover={{ opacity: 1 }}
          ml="0.375rem"
          href={`#${id}`}
        >
          #
        </Link>
      )}
    </H>
  );
};

const InlineCode = (props: any) => (
  <chakra.code
    apply="mdx.code"
    color={useColorModeValue("blue.600", "blue.100")}
    bgColor={useColorModeValue("gray.100", "gray.700")}
    rounded="md"
    {...props}
  />
);

const MDXComponents = {
  h1: (props) => (
    <LinkedHeading H={chakra.h1} apply="mdx.h1" fontSize="5xl" {...props} />
  ),
  h2: (props) => (
    <LinkedHeading H={chakra.h2} apply="mdx.h2" fontSize="4xl" {...props} />
  ),
  h3: (props) => (
    <LinkedHeading H={chakra.h3} apply="mdx.h3" fontSize="3xl" {...props} />
  ),
  h4: (props) => (
    <LinkedHeading H={chakra.h4} apply="mdx.h4" fontSize="2xl" {...props} />
  ),
  h5: (props) => (
    <LinkedHeading H={chakra.h5} apply="mdx.h5" fontSize="xl" {...props} />
  ),
  h6: (props) => (
    <LinkedHeading H={chakra.h6} apply="mdx.h6" fontSize="xl" {...props} />
  ),
  hr: (props) => <chakra.hr apply="mdx.hr" {...props} />,
  strong: (props) => <Box as="strong" fontWeight="semibold" {...props} />,
  inlineCode: InlineCode,
  code: CodeBlock,
  pre: Pre,
  kbd: Kbd,
  // br: (props) => <Box height="24px" {...props} />,
  br: (props) => <br />,
  table: Table,
  th: THead,
  td: TData,
  a: (props) => (
    <chakra.a
      apply="mdx.a"
      color="red.500"
      textDecoration="underline"
      textDecorationThickness="2px"
      textUnderlineOffset="3px"
      {...props}
    />
  ),
  p: (props) => <chakra.p apply="mdx.p" mt="6" mb="6" {...props} />,
  ul: (props) => <chakra.ul apply="mdx.ul" mt="6" mb="6" {...props} />,
  ol: (props) => <chakra.ol apply="mdx.ul" mt="6" mb="6" {...props} />,
  li: (props) => <chakra.li mt="2" mb="2" pb="4px" {...props} />,
  blockquote: (props) => (
    <Alert
      role="none"
      status="warning"
      variant="left-accent"
      as="blockquote"
      rounded="4px"
      py="0"
      {...props}
    />
  ),
};

export default MDXComponents;
