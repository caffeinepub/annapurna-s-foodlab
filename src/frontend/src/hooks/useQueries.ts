import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { MenuItem, Review } from "../backend.d";
import { MenuCategory } from "../backend.d";
import { useActor } from "./useActor";

export function useInitializeMenuItems() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["initMenuItems"],
    queryFn: async () => {
      if (!actor) return null;
      await actor.initializeMenuItems();
      return true;
    },
    enabled: !!actor && !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
    retry: false,
  });
}

export function useGetAllMenuItems() {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMenuItems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMenuItemsByCategory(category: MenuCategory | "all") {
  const { actor, isFetching } = useActor();
  return useQuery<MenuItem[]>({
    queryKey: ["menuItems", category],
    queryFn: async () => {
      if (!actor) return [];
      if (category === "all") {
        return actor.getAllMenuItems();
      }
      return actor.getMenuItemsByCategory(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetReviews() {
  const { actor, isFetching } = useActor();
  return useQuery<Review[]>({
    queryKey: ["reviews"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getReviews();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddReview() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      name,
      rating,
      comment,
    }: {
      name: string;
      rating: bigint;
      comment: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.addReview(name, rating, comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });
}

export function useSubmitContactForm() {
  const { actor } = useActor();
  return useMutation({
    mutationFn: async ({
      name,
      phone,
      message,
    }: {
      name: string;
      phone: string;
      message: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      return actor.submitContactForm(name, phone, message);
    },
  });
}

export { MenuCategory };
