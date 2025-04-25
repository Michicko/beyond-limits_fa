import PageTitle from "@/components/admin/Layout/PageTitle";
import React from "react";
import { Box, Button, Container, HStack } from "@chakra-ui/react";
import TableColumnHeader from "@/components/admin/Table/TableColumnHeader";
import TableCell from "@/components/admin/Table/TableCell";
import Pagination from "@/components/admin/Pagination/Pagination";
import Table from "@/components/admin/Table/Table";
import TableHeader from "@/components/admin/Table/TableHeader";
import TableRows from "@/components/admin/Table/TableRows";
import TableBody from "@/components/admin/Table/TableBody";
import CustomMenu from "@/components/admin/CustomMenu/CustomMenu";
import CustomMenuItem from "@/components/admin/CustomMenu/CustomMenuItem";
import Link from "next/link";
import { cookiesClient } from "@/utils/amplify-utils";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import { formatDate } from "@/lib/helpers";
import DeleteBtn from "@/components/admin/DeleteBtn/DeleteBtn";
import useToast from "@/hooks/useToast";
import { deleteSeason } from "@/app/_actions/season-actions";

async function Seasons() {
  const btnStyles = {
    p: "10px 20px",
    fontSize: "md",
    fontWeight: "semibold",
  };

  const { data: seasons, errors } = await cookiesClient.models.Season.list({
    selectionSet: ["id", "season", "createdAt"],
    authMode: "userPool",
  });

  const { promiseToast } = useToast();

  const handleDelete = (id: string, name: string) => {
    const promise = deleteSeason(id);
    promiseToast(promise, name);
  };

  return (
    <>
      <PageTitle pageTitle="Seasons" />
      <Box w={"full"} h={"full"} mt={"30px"}>
        <Container maxW={"4xl"} fluid margin={"0 auto"}>
          <HStack justify={"flex-end"} mb={"20px"} gap="4">
            <Button
              colorPalette={"blue"}
              variant={"solid"}
              css={btnStyles}
              size={"md"}
              asChild
            >
              <Link href={"/cp/seasons/create"}>Create Season</Link>
            </Button>
          </HStack>
          {errors ? (
            <CustomAlert
              status="error"
              title="Something went wrong."
              message={errors[0].message}
            />
          ) : seasons.length < 1 ? (
            <CustomAlert
              status="info"
              title="No Seasons."
              message={"No season available, create some to get started."}
            />
          ) : (
            <>
              <Table>
                <>
                  <TableHeader>
                    <TableRows>
                      <>
                        {["season", "created", ""].map((head, i) => {
                          return (
                            <TableColumnHeader
                              key={head}
                              textAlign={"left"}
                              pl={i === 0 ? "10px" : "0"}
                              fontWeight={"500"}
                            >
                              {head}
                            </TableColumnHeader>
                          );
                        })}
                      </>
                    </TableRows>
                  </TableHeader>
                  <TableBody>
                    <>
                      {seasons.map((season) => {
                        return (
                          <TableRows key={season.season}>
                            <>
                              <TableCell pl={"10px"}>{season.season}</TableCell>
                              <TableCell>
                                {formatDate(season.createdAt)}
                              </TableCell>
                              <TableCell>
                                <CustomMenu>
                                  <>
                                    <CustomMenuItem
                                      label="Edit"
                                      showBorder={true}
                                    >
                                      <Link
                                        href={`/cp/seasons/${season.id}/edit`}
                                      >
                                        Edit
                                      </Link>
                                    </CustomMenuItem>
                                    <DeleteBtn
                                      name={season.season}
                                      id={season.id}
                                      onDelete={deleteSeason}
                                    />
                                  </>
                                </CustomMenu>
                              </TableCell>
                            </>
                          </TableRows>
                        );
                      })}
                    </>
                  </TableBody>
                </>
              </Table>
              {/* <HStack justify={"center"} w={"full"}>
                <Pagination />
              </HStack> */}
            </>
          )}
        </Container>
      </Box>
    </>
  );
}

export default Seasons;
