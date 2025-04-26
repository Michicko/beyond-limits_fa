import { Skeleton, Table } from "@chakra-ui/react";

const TableSkeleton = ({ rows, cols }: { rows: number; cols: number }) => {
  return (
    <Table.ScrollArea mb={"30px"}>
      <Table.Root
        minWidth={"768px"}
        size="sm"
        bg={"card_bg"}
        variant={"line"}
        mb={"10px"}
        userSelect={"none"}
      >
        <Table.Header>
          <Table.Row>
            <>
              {Array.from({ length: cols }).map((_, i) => {
                return (
                  <Table.Cell key={i + (i + 3) + (i + 1) * 3}>
                    <Skeleton height="50px" width="150px" />
                  </Table.Cell>
                );
              })}
            </>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <>
            {Array.from({ length: rows }).map((_, i) => (
              <Table.Row key={i + (i + 2) + (i + 3) * 2} py={10}>
                {Array.from({ length: cols }).map((_, j) => {
                  return (
                    <Table.Cell key={j + (i + 2) + (j + i + 2 * 3)}>
                      <Skeleton height="20px" width="150px" />
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
          </>
        </Table.Body>
      </Table.Root>
    </Table.ScrollArea>
  );
};

export default TableSkeleton;
