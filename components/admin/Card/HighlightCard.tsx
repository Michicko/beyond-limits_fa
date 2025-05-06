import { Schema } from "@/amplify/data/resource";
import { getIcon } from "@/lib/icons";
import {
  Card,
  Heading,
  HStack,
  Icon,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import CustomMenu from "../CustomMenu/CustomMenu";
import CustomMenuItem from "../CustomMenu/CustomMenuItem";
import DeleteBtn from "../DeleteBtn/DeleteBtn";

type IHighlight = Pick<
  Schema["Highlight"]["type"],
  "id" | "coverImage" | "description" | "title" | "videoId" | "tags"
>;

function HighlightCard({ highlight }: { highlight: IHighlight }) {
  return (
    <Card.Root
      boxShadow={"0 2px 2px rgba(0,0,0,.15)"}
      borderRadius={"5px"}
      overflow={"hidden"}
      position={"relative"}
      bg={"card_bg"}
    >
      <Card.Body
        minH={"150px"}
        maxH={"255px"}
        position={"relative"}
        overflow={"hidden"}
      >
        <Image
          src={highlight.coverImage}
          height={500}
          w={500}
          maxW={"100%"}
          h={"auto"}
          loading="lazy"
          position={"absolute"}
          top={0}
          left={0}
          right={0}
          bottom={0}
          objectFit={"cover"}
        />
      </Card.Body>
      <Card.Footer p={"4"}>
        <Stack>
          <HStack>
            <Icon color={"text_lg"} size={"md"}>
              {getIcon("video")}
            </Icon>
            <Heading
              as={"h3"}
              fontWeight={"700"}
              fontSize={"md"}
              textTransform={"capitalize"}
            >
              {highlight.title}
            </Heading>
          </HStack>
          <HStack>
            <Icon color={"text_lg"} size={"md"}>
              {getIcon("link")}
            </Icon>
            <Link
              as={"a"}
              target="_blank"
              color={"primary"}
              textDecoration={"underline"}
              href={`https://www.youtube.com/watch?v=${highlight.videoId}`}
            >
              Watch on Youtube
            </Link>
          </HStack>
          {highlight.tags && highlight.tags.length > 0 && (
            <HStack>
              <Icon color={"text_lg"} size={"md"}>
                {getIcon("tag")}
              </Icon>
              <HStack flexWrap={"wrap"}>
                {highlight.tags?.map((tag) => {
                  return (
                    <Text
                      key={tag}
                      color={"primary"}
                      textDecoration={"underline"}
                    >
                      #{tag}
                    </Text>
                  );
                })}
              </HStack>
            </HStack>
          )}
        </Stack>
      </Card.Footer>
      <CustomMenu position="absolute">
        <>
          <CustomMenuItem label="Edit" showBorder={true}>
            <Link href={`/cp/highlights/${highlight.id}/edit`}>Edit</Link>
          </CustomMenuItem>
          {highlight.id && (
            <DeleteBtn
              name={highlight.title}
              id={highlight.id}
              module="Highlight"
              images={[highlight.coverImage]}
            />
          )}
        </>
      </CustomMenu>
    </Card.Root>
  );
}

export default HighlightCard;
