/**
 * Native Todo app home screen.
 * Provides a simple mobile-first todo list with add, search, complete, and delete actions.
 */

import { useMemo, useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import { Check, Circle, Plus, Search, Trash2 } from "lucide-react-native";

type Todo = {
  id: string;
  title: string;
  completed: boolean;
};

export default function TodoHomeScreen() {
  const isDark = useColorScheme() === "dark";
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState("");
  const [query, setQuery] = useState("");

  const colors = {
    background: isDark ? "#0f172a" : "#f8fafc",
    card: isDark ? "#1e293b" : "#ffffff",
    text: isDark ? "#f8fafc" : "#0f172a",
    muted: isDark ? "#94a3b8" : "#64748b",
    border: isDark ? "#334155" : "#e2e8f0",
  };

  const visibleTodos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return todos.filter((todo) => todo.title.toLowerCase().includes(normalizedQuery));
  }, [query, todos]);

  function addTodo() {
    const normalizedTitle = title.trim();
    if (!normalizedTitle) return;
    setTodos((current) => [
      { id: `${Date.now()}-${normalizedTitle}`, title: normalizedTitle, completed: false },
      ...current,
    ]);
    setTitle("");
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.eyebrow, { color: "#2563eb" }]}>DAILY TODO LIST</Text>
          <Text style={[styles.heading, { color: colors.text }]}>Get things done.</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Keep your priorities close and your day moving.
          </Text>
        </View>

        <View style={[styles.inputCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <TextInput
            value={title}
            onChangeText={setTitle}
            onSubmitEditing={addTodo}
            placeholder="Add a todo..."
            placeholderTextColor={colors.muted}
            returnKeyType="done"
            style={[styles.input, { color: colors.text }]}
            accessibilityLabel="Todo title"
          />
          <Pressable
            onPress={addTodo}
            accessibilityRole="button"
            accessibilityLabel="Add todo"
            style={styles.addButton}
          >
            <Plus size={22} color="#ffffff" />
          </Pressable>
        </View>

        <View style={[styles.searchBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Search size={18} color={colors.muted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search todos"
            placeholderTextColor={colors.muted}
            style={[styles.searchInput, { color: colors.text }]}
            accessibilityLabel="Search todos"
          />
        </View>

        <FlatList
          data={visibleTodos}
          keyExtractor={(todo) => todo.id}
          contentContainerStyle={visibleTodos.length === 0 ? styles.emptyList : styles.list}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={[styles.emptyTitle, { color: colors.text }]}>No todos yet</Text>
              <Text style={[styles.subtitle, { color: colors.muted }]}>
                Add your first todo above.
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={[styles.todoRow, { backgroundColor: colors.card, borderColor: colors.border }]}>
              <Pressable
                onPress={() =>
                  setTodos((current) =>
                    current.map((todo) =>
                      todo.id === item.id ? { ...todo, completed: !todo.completed } : todo,
                    ),
                  )
                }
                accessibilityRole="checkbox"
                accessibilityState={{ checked: item.completed }}
                accessibilityLabel={`${item.completed ? "Reopen" : "Complete"} ${item.title}`}
              >
                {item.completed ? <Check size={22} color="#2563eb" /> : <Circle size={22} color={colors.muted} />}
              </Pressable>
              <Text style={[styles.todoTitle, { color: colors.text }, item.completed && styles.completed]}>
                {item.title}
              </Text>
              <Pressable
                onPress={() => setTodos((current) => current.filter((todo) => todo.id !== item.id))}
                accessibilityRole="button"
                accessibilityLabel={`Delete ${item.title}`}
              >
                <Trash2 size={18} color="#ef4444" />
              </Pressable>
            </View>
          )}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, padding: 20, paddingTop: 72 },
  header: { marginBottom: 24 },
  eyebrow: { fontSize: 12, fontWeight: "800", letterSpacing: 1.2, marginBottom: 8 },
  heading: { fontSize: 34, fontWeight: "900", letterSpacing: -0.8 },
  subtitle: { fontSize: 14, lineHeight: 21, marginTop: 6 },
  inputCard: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 16, padding: 6 },
  input: { flex: 1, height: 46, paddingHorizontal: 12, fontSize: 16 },
  addButton: { alignItems: "center", justifyContent: "center", width: 46, height: 46, borderRadius: 12, backgroundColor: "#2563eb" },
  searchBox: { flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 14, marginTop: 14, paddingHorizontal: 12 },
  searchInput: { flex: 1, height: 44, paddingHorizontal: 10, fontSize: 14 },
  list: { gap: 10, paddingTop: 18, paddingBottom: 24 },
  emptyList: { flexGrow: 1, justifyContent: "center" },
  emptyState: { alignItems: "center" },
  emptyTitle: { fontSize: 18, fontWeight: "800" },
  todoRow: { flexDirection: "row", alignItems: "center", gap: 12, borderWidth: 1, borderRadius: 16, padding: 16 },
  todoTitle: { flex: 1, fontSize: 15, fontWeight: "600" },
  completed: { color: "#94a3b8", textDecorationLine: "line-through" },
});
