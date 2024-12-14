import db from "@/database/db";

export const supabaseActions = {
  // Profile operations
  async createProfile(userId, username, fullName) {
    return await db.from("profiles").insert({
      id: userId,
      username,
      full_name: fullName,
    });
  },

  async getProfile(userId) {
    return await db.from("profiles").select("*").eq("id", userId).single();
  },

  // Group operations
  async createGroup(name, startDate, endDate, destination) {
    const {
      data: { user },
    } = await db.auth.getUser();
    const joinCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const { data, error } = await db
      .from("groups")
      .insert({
        name,
        start_date: startDate,
        end_date: endDate,
        destination,
        join_code: joinCode,
      })
      .select()
      .single();

    if (error) throw error;

    // Add creator as admin
    await db.from("group_members").insert({
      group_id: data.id,
      user_id: user.id,
      role: "admin",
    });

    return data;
  },

  async joinGroup(joinCode) {
    const {
      data: { user },
    } = await db.auth.getUser();

    const { data: group, error } = await db
      .from("groups")
      .select("id")
      .eq("join_code", joinCode)
      .single();

    if (error) throw error;

    return await db.from("group_members").insert({
      group_id: group.id,
      user_id: user.id,
    });
  },

  async getUserGroups() {
    const {
      data: { user },
    } = await db.auth.getUser();
    return await db
      .from("groups")
      .select(
        `
      *,
      group_members!inner(*),
      pinned_items(*)
    `
      )
      .eq("group_members.user_id", user.id);
  },

  async getGroupDetails(groupId) {
    return await db
      .from("groups")
      .select(
        `
      *,
      group_members(*),
      pinned_items(*)
    `
      )
      .eq("id", groupId)
      .single();
  },

  async addPinnedItem(groupId, type, itemData) {
    const {
      data: { user },
    } = await db.auth.getUser();
    const { data, error } = await db
      .from("pinned_items")
      .insert({
        group_id: groupId,
        type,
        item_data: itemData,
        created_by: user.id,
      })
      .select(); // Add .select() to return the inserted data

    if (error) throw error;
    return { data, error };
  },

  async getGroupPinnedItems(groupId) {
    return await db.from("pinned_items").select("*").eq("group_id", groupId);
  },

  // Add these to the existing supabaseActions object
  async signUp(email, password, username, fullName) {
    const { data: authData, error: authError } = await db.auth.signUp({
      email,
      password,
    });

    if (authError) throw authError;

    // Create profile after successful signup
    const { error: profileError } = await this.createProfile(
      authData.user.id,
      username,
      fullName
    );

    if (profileError) throw profileError;

    return authData;
  },

  async signIn(email, password) {
    const { data, error } = await db.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  },

  async signOut() {
    const { error } = await db.auth.signOut();
    if (error) throw error;
  },

  async getCurrentUser() {
    const {
      data: { user },
      error,
    } = await db.auth.getUser();
    if (error) throw error;
    return user;
  },

  async getCurrentProfile() {
    const user = await this.getCurrentUser();
    if (!user) return null;

    const { data, error } = await this.getProfile(user.id);
    if (error) throw error;
    return data;
  },

  async deleteGroupPinnedItem(groupId, itemId) {
    return await db
      .from("pinned_items")
      .delete()
      .eq("id", itemId)
      .eq("group_id", groupId);
  },
};
