"use client";
import { getBanners } from "@/app/_actions/banner-actions";
import CustomAlert from "@/components/admin/Alert/CustomAlert";
import VisualCard from "@/components/admin/Card/VisualCard";
import BannerForm from "@/components/admin/Forms/BannerForm";
import PageTitle from "@/components/admin/Layout/PageTitle";
import { Box, Grid, GridItem, HStack, Skeleton } from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";

function banners() {
  const { data, isLoading, error } = useSWR(["banners"], getBanners);

  const images = data?.data ?? [];

  return (
    <>
      <PageTitle pageTitle={"Banners"} />
      <Box w="full" h="full" mt="20px">
        <HStack justify="flex-end" mb={6}>
          <Skeleton
            loading={isLoading}
            w={isLoading ? "130px" : "auto"}
            h={isLoading ? "40px" : "auto"}
          >
            <BannerForm />
          </Skeleton>
        </HStack>

        {isLoading ? (
          <Grid
            gridTemplateColumns={{
              base: "1fr",
              md: "repeat(2, 1fr)",
              xl: "repeat(3, 1fr)",
            }}
            gap="20px"
            mb="100px"
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <GridItem key={i}>
                <Skeleton h="200px" w="full" maxW="360px" loading={isLoading} />
              </GridItem>
            ))}
          </Grid>
        ) : error ? (
          <CustomAlert
            status="error"
            title="Something went wrong."
            message={error?.message}
          />
        ) : !images || images.length < 1 ? (
          <CustomAlert
            status="info"
            title={"No images"}
            message={"No Images available at the moment"}
          />
        ) : (
          <>
            <Grid
              gridTemplateColumns={{
                base: "1fr",
                md: "repeat(2, 1fr)",
                xl: "repeat(3, 1fr)",
              }}
              gap="20px"
              mb="100px"
              mt={4}
            >
              {images.map((el) => {
                return (
                  <GridItem key={el.id}>
                    <VisualCard moduleName="Banner" visual={el} />
                  </GridItem>
                );
              })}
            </Grid>
          </>
        )}
      </Box>
    </>
  );
}

export default banners;
