#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn load_pdf(file_path: String) -> Result<String, String> {
    println!("Received PDF file path: {}", file_path);
    Ok(format!("Successfully received file: {}", file_path))
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_dialog::init())
        .invoke_handler(tauri::generate_handler![greet, load_pdf])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
