import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: ["User", "CMs"],
  endpoints: (build) => ({
    getCMs: build.query({
      query: () => ({
        url: `client/CMs`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["CMs"],
      invalidatesTags: ["CMs", "User"],
    }),
    getSingleCM: build.query({
      query: (id) => ({
        query: `client/CMs/${id}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["CM"],
    }),
    createCM: build.mutation({
      query: (CM) => ({
        url: "/client/CM",
        method: "POST",
        body: CM,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["CMs"],
    }),
    updateCM: build.mutation({
      query: (CM) => ({
        url: `/client/CMs/${CM.id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: {
          id: CM.id,
          responsible: CM.responsible,
          accountable: CM.accountable,
          technicalDescription: CM.technicalDescription,
          sparePartsUsed: CM.sparePartsUsed,
          sparePartsRequired: CM.sparePartsRequired,
        },
      }),
      invalidatesTags: ["CMs"],
    }),
    requirePo: build.mutation({
      query: (cm) => ({
        url: `/client/CMs/po/${cm.id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: { PO: cm.PO },
      }),
      invalidatesTags: ["CMs"],
    }),
    isPoCompleted: build.mutation({
      query: (cm) => ({
        url: `/client//CMs/po_completed/${cm.id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: { isPoFullFilled: cm.isPoFullFilled },
      }),
      invalidatesTags: ["CMs"],
    }),
    requestForPoReceived: build.mutation({
      query: (id) => ({
        url: `/client//CMs/request_for_PO_received/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["CMs"],
    }),
    requestForClose: build.mutation({
      query: (id) => ({
        url: `/client//CMs/request_for_close/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["CMs"],
    }),
    completeCM: build.mutation({
      query: (id) => ({
        url: `/client/CMs/completed/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["CMs"],
    }),
    getUser: build.query({
      query: () => ({
        url: `auth/user`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useGetCMsQuery,
  useCreateCMMutation,
  useGetSingleCMQuery,
  useUpdateCMMutation,
  useRequirePoMutation,
  useCompleteCMMutation,
  useIsPoCompletedMutation,
  useRequestForPoReceivedMutation,
  useRequestForCloseMutation,
  useGetUserQuery,
} = api;
