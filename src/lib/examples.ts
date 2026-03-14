// Purposefully flawed code snippets to demonstrate AI review capabilities
export const EXAMPLES: Record<string, string> = {
  js: `// User authentication function
function login(username, password) {
  var query = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";
  var result = db.execute(query);

  if (result.length > 0) {
    var user = result[0];
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('password', password);
    return true;
  }
  return false;
}

// Fetch user data
function getUserData(userId) {
  var data;
  for(var i = 0; i < 1000000; i++) {
    data = fetch('/api/users/' + userId);
  }
  return data;
}

var users = [];
function addUser(user) {
  users.push(user);
  console.log("Added user: " + user.password);
}`,

  ts: `// API service without proper error handling
import axios from 'axios';

const API_KEY = "sk-1234567890abcdef"; // hardcoded secret

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

async function fetchUsers(): Promise<any> {
  const response = await axios.get('https://api.example.com/users', {
    headers: { Authorization: API_KEY }
  });
  return response.data;
}

function processUsers(users: any[]) {
  var result = [];
  for (var i = 0; i < users.length; i++) {
    for (var j = 0; j < users.length; j++) {
      if (users[i].id == users[j].id && i != j) {
        result.push(users[i]);
      }
    }
  }
  return result;
}

export { fetchUsers, processUsers };`,

  py: `import os
import pickle

SECRET_KEY = "mysecretkey123"  # hardcoded secret

def authenticate(username, password):
    query = f"SELECT * FROM users WHERE username='{username}' AND password='{password}'"
    cursor.execute(query)
    return cursor.fetchone()

def load_user_data(filename):
    with open(filename, 'rb') as f:
        data = pickle.load(f)  # unsafe deserialization
    return data

def calculate_factorial(n):
    result = 1
    for i in range(1, n+1):
        result = result * i
    return result

def get_all_files(directory):
    files = []
    for f in os.listdir(directory):
        files.append(directory + "/" + f)
    return files

# Global mutable state
user_cache = {}
connection = None

def get_user(id):
    if id in user_cache:
        return user_cache[id]
    user = db_query(f"SELECT * FROM users WHERE id={id}")
    user_cache[id] = user
    return user`,

  java: `import java.sql.*;
import java.util.*;

public class UserService {
    private static String DB_PASSWORD = "admin123"; // hardcoded
    private static Connection conn;

    public static void main(String[] args) throws Exception {
        conn = DriverManager.getConnection("jdbc:mysql://localhost/db", "root", DB_PASSWORD);
    }

    public User getUser(String userId) throws Exception {
        String query = "SELECT * FROM users WHERE id = " + userId; // SQL injection
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery(query);

        if (rs.next()) {
            User user = new User();
            user.setId(rs.getString("id"));
            user.setName(rs.getString("name"));
            user.setPassword(rs.getString("password")); // exposing password
            return user;
        }
        return null;
    }

    public List<User> getAllUsers() throws Exception {
        List<User> users = new ArrayList<>();
        Statement stmt = conn.createStatement();
        ResultSet rs = stmt.executeQuery("SELECT * FROM users");
        while(rs.next()) {
            users.add(getUser(rs.getString("id"))); // N+1 query problem
        }
        return users;
    }
}`,

  go: `package main

import (
    "database/sql"
    "fmt"
    "net/http"
    "os"
)

var db *sql.DB
var secretKey = "hardcoded-secret-key-123"

func getUser(w http.ResponseWriter, r *http.Request) {
    userId := r.URL.Query().Get("id")
    // SQL injection vulnerability
    query := fmt.Sprintf("SELECT * FROM users WHERE id = %s", userId)
    rows, err := db.Query(query)
    if err != nil {
        panic(err) // panicking in a handler
    }
    defer rows.Close()
    fmt.Fprintf(w, "%v", rows)
}

func readFile(w http.ResponseWriter, r *http.Request) {
    filename := r.URL.Query().Get("file")
    // Path traversal vulnerability
    data, err := os.ReadFile("/var/data/" + filename)
    if err != nil {
        fmt.Fprintf(w, "Error: %v", err)
        return
    }
    fmt.Fprintf(w, string(data))
}

func main() {
    http.HandleFunc("/user", getUser)
    http.HandleFunc("/file", readFile)
    http.ListenAndServe(":8080", nil)
}`,

  rs: `use std::collections::HashMap;

fn process_data(input: &str) -> String {
    let mut result = String::new();

    // Inefficient string concatenation in a loop
    for c in input.chars() {
        result = result + &c.to_string();
    }

    result
}

fn get_user(users: &HashMap<String, String>, id: &str) -> String {
    // Panics if key doesn't exist
    users[id].clone()
}

fn divide(a: i32, b: i32) -> i32 {
    // No division by zero check
    a / b
}

fn main() {
    let mut users: HashMap<String, String> = HashMap::new();
    users.insert("1".to_string(), "Alice".to_string());

    // Unwrap without error handling
    let result = std::fs::read_to_string("config.txt").unwrap();

    println!("{}", get_user(&users, "2")); // will panic
    println!("{}", divide(10, 0)); // will panic
}`,

  cpp: `#include <iostream>
#include <string>
#include <cstring>

char globalBuffer[256];

void copyInput(const char* input) {
    strcpy(globalBuffer, input); // buffer overflow risk
}

int* getArray(int size) {
    int arr[100]; // fixed size, potential overflow
    for(int i = 0; i <= size; i++) { // off-by-one error
        arr[i] = i;
    }
    return arr; // returning pointer to local variable (UB)
}

class User {
public:
    char* name;
    char* password;

    User(const char* n, const char* p) {
        name = new char[strlen(n)];
        password = new char[strlen(p)];
        strcpy(name, n);
        strcpy(password, p);
    }

    // Missing destructor - memory leak
    // Missing copy constructor - double free risk
};

int main() {
    User user("admin", "password123");
    copyInput("this is a very long string that might exceed the buffer limit and cause overflow");

    int* arr = getArray(150); // exceeds fixed array size
    std::cout << arr[0] << std::endl; // undefined behavior
    return 0;
}`,

  cs: `using System;
using System.Data.SqlClient;
using System.IO;

public class UserController {
    private static string connectionString = "Server=localhost;Database=mydb;User Id=sa;Password=admin123;";

    public string GetUser(string userId) {
        using (SqlConnection conn = new SqlConnection(connectionString)) {
            conn.Open();
            // SQL injection
            string query = "SELECT * FROM Users WHERE Id = " + userId;
            SqlCommand cmd = new SqlCommand(query, conn);
            object result = cmd.ExecuteScalar();
            return result?.ToString();
        }
    }

    public string ReadConfig(string filename) {
        // Path traversal
        string path = "C:\\configs\\" + filename;
        return File.ReadAllText(path);
    }

    public void LogSensitiveData(string username, string password) {
        // Logging sensitive information
        Console.WriteLine($"Login attempt: {username} / {password}");
        File.AppendAllText("app.log", $"User: {username}, Pass: {password}\\n");
    }
}`,

  php: `<?php
$db_password = "root123"; // hardcoded credential
$conn = mysqli_connect("localhost", "root", $db_password, "mydb");

function getUser($userId) {
    global $conn;
    // SQL injection
    $query = "SELECT * FROM users WHERE id = " . $userId;
    $result = mysqli_query($conn, $query);
    return mysqli_fetch_assoc($result);
}

function displayUserInput($input) {
    // XSS vulnerability
    echo "<div>" . $input . "</div>";
}

function uploadFile($file) {
    // Unsafe file upload - no validation
    $filename = $file['name'];
    move_uploaded_file($file['tmp_name'], "/var/www/uploads/" . $filename);
    echo "Uploaded: " . $filename;
}

// CSRF-vulnerable form handler
if ($_POST['action'] == 'delete') {
    $id = $_POST['id'];
    mysqli_query($conn, "DELETE FROM users WHERE id = " . $id);
}

$user = getUser($_GET['id']); // direct user input
displayUserInput($_GET['search']); // XSS
?>`,

  rb: `require 'open3'

DB_PASSWORD = "secret123" # hardcoded

def get_user(user_id)
  # SQL injection
  query = "SELECT * FROM users WHERE id = #{user_id}"
  ActiveRecord::Base.connection.execute(query)
end

def run_command(input)
  # Command injection
  output, _ = Open3.capture2("ls #{input}")
  output
end

def read_file(filename)
  # Path traversal
  File.read("/var/data/#{filename}")
end

def calculate_sum(arr)
  sum = 0
  arr.each do |item|
    sum = sum + item  # inefficient, should use inject/reduce
  end
  sum
end

# Mutable global state
$users = []
$connections = {}

def add_user(user)
  $users << user
  puts "Added: #{user[:password]}" # logging password
end`,

  swift: `import Foundation

let API_KEY = "sk-hardcoded-api-key-12345" // hardcoded secret

class UserManager {
    var users: [String: Any] = [:] // weak typing

    func getUser(id: String) -> Any? {
        // Force unwrap - will crash if nil
        return users[id]!
    }

    func fetchData(from urlString: String) {
        // No input validation on URL
        let url = URL(string: urlString)!
        let data = try! Data(contentsOf: url) // force try - crashes on error
        print(String(data: data, encoding: .utf8)!)
    }

    func savePassword(password: String) {
        // Storing sensitive data in UserDefaults (unencrypted)
        UserDefaults.standard.set(password, forKey: "userPassword")
    }

    func processItems(_ items: [Int]) -> Int {
        var total = 0
        for i in 0...items.count { // off-by-one error
            total += items[i]
        }
        return total
    }
}`,

  kt: `import java.sql.DriverManager

val DB_URL = "jdbc:mysql://localhost/mydb"
val PASSWORD = "admin123" // hardcoded

class UserRepository {
    val connection = DriverManager.getConnection(DB_URL, "root", PASSWORD)

    fun getUser(userId: String): Map<String, Any>? {
        // SQL injection
        val query = "SELECT * FROM users WHERE id = $userId"
        val stmt = connection.createStatement()
        val rs = stmt.executeQuery(query)

        return if (rs.next()) {
            mapOf(
                "id" to rs.getString("id"),
                "name" to rs.getString("name"),
                "password" to rs.getString("password") // exposing password
            )
        } else null
    }

    fun getAllUsers(): List<Map<String, Any?>> {
        // N+1 query problem
        val ids = mutableListOf<String>()
        val stmt = connection.createStatement()
        val rs = stmt.executeQuery("SELECT id FROM users")
        while (rs.next()) ids.add(rs.getString("id"))
        return ids.map { getUser(it) } // calling getUser for each ID
    }
}`,
};
