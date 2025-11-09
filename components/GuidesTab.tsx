import React from 'react';

const CodeBlock: React.FC<{ code: string; language: string }> = ({ code, language }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-md my-4 relative">
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-700">
        <span className="text-xs font-semibold text-gray-400 uppercase">{language}</span>
        <button onClick={handleCopy} className="text-xs font-semibold text-gray-400 hover:text-white transition-colors">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm">
        <code className={`language-${language}`}>
          {code.trim()}
        </code>
      </pre>
    </div>
  );
};

const EnglishGuide = () => (
  <>
    <h2 className="text-2xl font-bold mb-4 text-cyan-400">How to Use the Nginx Config Assistant</h2>
    <p>Welcome to the Nginx Config Assistant! This tool is designed to simplify the process of creating robust load balancer configurations for Nginx. By filling out a few forms, you can generate a complete configuration file without writing any code by hand.</p>
    <p>Follow these steps to create your configuration:</p>

    <h3 className="text-xl font-bold mt-6 mb-2 text-cyan-400">Step 1: Configure Upstreams</h3>
    <p>An "Upstream" is a group of backend servers that will handle the requests. Your load balancer will distribute traffic among these servers.</p>
    <ol className="list-decimal list-inside space-y-2">
      <li>Navigate to the <strong>Setup</strong> tab.</li>
      <li>In the "Upstreams Configuration" section, click on the <strong>Add New Upstream</strong> dropdown to open the form.</li>
      <li><strong>Upstream Name:</strong> Give your server pool a unique, descriptive name (e.g., <code>api_servers</code> or <code>webapp_backend</code>). This name will be used later to link a VIP to this group.</li>
      <li>
        <strong>Load Balancing Method:</strong> Choose how Nginx should distribute traffic:
        <ul className="list-disc list-inside ml-6 mt-1">
          <li><strong>Round Robin:</strong> (Default) Sends requests to each server in turn.</li>
          <li><strong>Least Connections:</strong> Sends the next request to the server with the fewest active connections. Ideal for varying request completion times.</li>
          <li><strong>IP Hash:</strong> Ensures that requests from the same client IP address will always go to the same server. Useful for session persistence.</li>
        </ul>
      </li>
      <li><strong>Backend Servers:</strong> Click "Add Server" to add one or more backend servers. For each server, provide its IP Address (or hostname) and the Port it's running on.</li>
      <li><strong>Enable Active Health Check:</strong> If checked, Nginx will periodically check if your servers are responsive. Note that this may require Nginx Plus or a specific open-source module.</li>
      <li>Click <strong>Add Upstream</strong>. Your new upstream pool will appear in the list below. You can add as many upstream groups as you need.</li>
    </ol>

    <h3 className="text-xl font-bold mt-6 mb-2 text-cyan-400">Step 2: Configure VIPs (Virtual Servers)</h3>
    <p>A "VIP" (Virtual IP), or a "Server Block" in Nginx terminology, defines how Nginx listens for incoming traffic and which upstream group to forward it to.</p>
    <ol className="list-decimal list-inside space-y-2">
      <li>In the "VIPs Configuration" section, click on the <strong>Add New VIP</strong> dropdown.</li>
      <li><strong>Server Name:</strong> Enter the domain name that this configuration should apply to (e.g., <code>myapp.example.com</code>).</li>
      <li><strong>Listen Port:</strong> This is the port Nginx will listen on for this server block. It defaults to 80 for standard HTTP.</li>
      <li><strong>Target Upstream:</strong> Select one of the upstreams you created in Step 1 from the dropdown menu.</li>
      <li>
        <strong>Enable SSL/TLS:</strong> Check this box to configure for HTTPS.
        <ul className="list-disc list-inside ml-6 mt-1">
          <li>The <strong>Listen Port</strong> will automatically change to 443.</li>
          <li>The tool will automatically add a redirect from HTTP to HTTPS in the generated config.</li>
          <li>You must provide the paths to your <strong>SSL Certificate (.crt)</strong> and <strong>Private Key (.key)</strong> files. These paths should be where the files are located on your Nginx server (e.g., <code>/etc/nginx/ssl/myapp.crt</code>).</li>
        </ul>
      </li>
      <li>Click <strong>Add VIP</strong>. Your new virtual server will be added to the list.</li>
    </ol>

    <h3 className="text-xl font-bold mt-6 mb-2 text-cyan-400">Step 3: Generate and Download</h3>
    <p>Once you've defined at least one upstream and one VIP, you're ready to generate the configuration file.</p>
    <ol className="list-decimal list-inside space-y-2">
      <li>Find the "Generate Configuration" box on the right side of the Setup page.</li>
      <li>Click the <strong>Generate & Review Config</strong> button.</li>
      <li>A modal window will appear, displaying the complete, formatted Nginx configuration file. Review it carefully to ensure it meets your needs.</li>
      <li>If everything looks correct, click the <strong>Approve & Download File</strong> button. This will download a file named <code>nginx.conf</code> to your computer.</li>
    </ol>

    <h3 className="text-xl font-bold mt-6 mb-2 text-cyan-400">Final Step: Deployment</h3>
    <p>Take the downloaded <code>nginx.conf</code> file and deploy it to your Nginx server. Typically, you would place this file in a directory like <code>/etc/nginx/conf.d/</code> or <code>/etc/nginx/sites-available/</code>. After placing the file, remember to test the configuration and then reload or restart your Nginx service.</p>
    <CodeBlock code={`# Test the configuration for syntax errors
sudo nginx -t

# If the test is successful, reload Nginx
sudo systemctl reload nginx`} language="bash" />
    <p>That's it! You've successfully created and deployed a load balancer configuration using the assistant.</p>
  </>
);

const VietnameseGuide = () => (
    <>
      <h2 className="text-2xl font-bold mb-4 text-cyan-400">Hướng dẫn sử dụng Nginx Config Assistant</h2>
      <p>Chào mừng bạn đến với Nginx Config Assistant! Công cụ này được thiết kế để đơn giản hóa quá trình tạo cấu hình bộ cân bằng tải mạnh mẽ cho Nginx. Bằng cách điền vào một vài biểu mẫu, bạn có thể tạo một tệp cấu hình hoàn chỉnh mà không cần viết bất kỳ mã nào.</p>
      <p>Hãy làm theo các bước sau để tạo cấu hình của bạn:</p>
  
      <h3 className="text-xl font-bold mt-6 mb-2 text-cyan-400">Bước 1: Cấu hình Upstream</h3>
      <p>"Upstream" là một nhóm các máy chủ backend sẽ xử lý các yêu cầu. Bộ cân bằng tải của bạn sẽ phân phối lưu lượng truy cập giữa các máy chủ này.</p>
      <ol className="list-decimal list-inside space-y-2">
        <li>Điều hướng đến tab <strong>Setup</strong>.</li>
        <li>Trong phần "Upstreams Configuration", nhấp vào menu thả xuống <strong>Add New Upstream</strong> để mở biểu mẫu.</li>
        <li><strong>Tên Upstream:</strong> Đặt cho nhóm máy chủ của bạn một cái tên duy nhất, dễ nhận biết (ví dụ: <code>api_servers</code> hoặc <code>webapp_backend</code>). Tên này sẽ được sử dụng sau để liên kết một VIP với nhóm này.</li>
        <li>
          <strong>Phương thức Cân bằng tải:</strong> Chọn cách Nginx sẽ phân phối lưu lượng truy cập:
          <ul className="list-disc list-inside ml-6 mt-1">
            <li><strong>Round Robin:</strong> (Mặc định) Gửi yêu cầu đến từng máy chủ theo thứ tự.</li>
            <li><strong>Least Connections:</strong> Gửi yêu cầu tiếp theo đến máy chủ có số lượng kết nối đang hoạt động ít nhất. Lý tưởng cho các yêu cầu có thời gian hoàn thành khác nhau.</li>
            <li><strong>IP Hash:</strong> Đảm bảo rằng các yêu cầu từ cùng một địa chỉ IP của máy khách sẽ luôn được chuyển đến cùng một máy chủ. Hữu ích cho việc duy trì phiên (session persistence).</li>
          </ul>
        </li>
        <li><strong>Máy chủ Backend:</strong> Nhấp vào "Add Server" để thêm một hoặc nhiều máy chủ backend. Đối với mỗi máy chủ, hãy cung cấp Địa chỉ IP (hoặc tên máy chủ) và Cổng (Port) mà nó đang chạy.</li>
        <li><strong>Bật Kiểm tra Sức khỏe Chủ động:</strong> Nếu được chọn, Nginx sẽ định kỳ kiểm tra xem máy chủ của bạn có phản hồi hay không. Lưu ý rằng điều này có thể yêu cầu Nginx Plus hoặc một mô-đun mã nguồn mở cụ thể.</li>
        <li>Nhấp vào <strong>Add Upstream</strong>. Nhóm upstream mới của bạn sẽ xuất hiện trong danh sách bên dưới. Bạn có thể thêm bao nhiêu nhóm upstream tùy ý.</li>
      </ol>
  
      <h3 className="text-xl font-bold mt-6 mb-2 text-cyan-400">Bước 2: Cấu hình VIP (Máy chủ ảo)</h3>
      <p>"VIP" (IP ảo), hoặc "Server Block" trong thuật ngữ của Nginx, xác định cách Nginx lắng nghe lưu lượng truy cập đến và nhóm upstream nào sẽ chuyển tiếp lưu lượng đó đến.</p>
      <ol className="list-decimal list-inside space-y-2">
        <li>Trong phần "VIPs Configuration", nhấp vào menu thả xuống <strong>Add New VIP</strong>.</li>
        <li><strong>Tên Máy chủ (Server Name):</strong> Nhập tên miền mà cấu hình này sẽ áp dụng (ví dụ: <code>myapp.example.com</code>).</li>
        <li><strong>Cổng Lắng nghe (Listen Port):</strong> Đây là cổng mà Nginx sẽ lắng nghe cho khối máy chủ này. Mặc định là 80 cho HTTP tiêu chuẩn.</li>
        <li><strong>Upstream Đích:</strong> Chọn một trong các upstream bạn đã tạo ở Bước 1 từ menu thả xuống.</li>
        <li>
          <strong>Bật SSL/TLS:</strong> Chọn hộp này để cấu hình cho HTTPS.
          <ul className="list-disc list-inside ml-6 mt-1">
            <li><strong>Cổng Lắng nghe</strong> sẽ tự động chuyển thành 443.</li>
            <li>Công cụ sẽ tự động thêm một chuyển hướng từ HTTP sang HTTPS trong cấu hình được tạo ra.</li>
            <li>Bạn phải cung cấp đường dẫn đến các tệp <strong>Chứng chỉ SSL (.crt)</strong> và <strong>Khóa riêng tư (.key)</strong> của mình. Các đường dẫn này phải là vị trí của các tệp trên máy chủ Nginx của bạn (ví dụ: <code>/etc/nginx/ssl/myapp.crt</code>).</li>
          </ul>
        </li>
        <li>Nhấp vào <strong>Add VIP</strong>. Máy chủ ảo mới của bạn sẽ được thêm vào danh sách.</li>
      </ol>
      
      <h3 className="text-xl font-bold mt-6 mb-2 text-cyan-400">Bước 3: Tạo và Tải xuống</h3>
      <p>Khi bạn đã xác định ít nhất một upstream và một VIP, bạn đã sẵn sàng để tạo tệp cấu hình.</p>
      <ol className="list-decimal list-inside space-y-2">
        <li>Tìm hộp "Generate Configuration" ở phía bên phải của trang Setup.</li>
        <li>Nhấp vào nút <strong>Generate & Review Config</strong>.</li>
        <li>Một cửa sổ modal sẽ xuất hiện, hiển thị tệp cấu hình Nginx hoàn chỉnh, đã được định dạng. Hãy xem lại cẩn thận để đảm bảo nó đáp ứng nhu cầu của bạn.</li>
        <li>Nếu mọi thứ đều chính xác, hãy nhấp vào nút <strong>Approve & Download File</strong>. Thao tác này sẽ tải xuống một tệp có tên <code>nginx.conf</code> về máy tính của bạn.</li>
      </ol>
      
      <h3 className="text-xl font-bold mt-6 mb-2 text-cyan-400">Bước cuối: Triển khai</h3>
      <p>Lấy tệp <code>nginx.conf</code> đã tải xuống và triển khai nó trên máy chủ Nginx của bạn. Thông thường, bạn sẽ đặt tệp này trong một thư mục như <code>/etc/nginx/conf.d/</code> hoặc <code>/etc/nginx/sites-available/</code>. Sau khi đặt tệp, hãy nhớ kiểm tra cấu hình và sau đó tải lại hoặc khởi động lại dịch vụ Nginx của bạn.</p>
      <CodeBlock code={`# Kiểm tra cú pháp của tệp cấu hình
sudo nginx -t

# Nếu kiểm tra thành công, tải lại Nginx
sudo systemctl reload nginx`} language="bash" />
      <p>Vậy là xong! Bạn đã tạo và triển khai thành công cấu hình bộ cân bằng tải bằng trình trợ giúp.</p>
    </>
);


export const GuidesTab: React.FC = () => {
    const [language, setLanguage] = React.useState<'en' | 'vi'>('en');

    return (
        <div className="bg-gray-800 rounded-lg shadow-md p-6 text-gray-300 max-w-none prose prose-invert prose-sm md:prose-base">
             <div className="flex justify-end mb-4 border-b border-gray-700 pb-4">
                <div className="flex space-x-1 bg-gray-900 p-1 rounded-md">
                    <button
                        onClick={() => setLanguage('en')}
                        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                            language === 'en' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:bg-gray-700'
                        }`}
                    >
                        English
                    </button>
                    <button
                        onClick={() => setLanguage('vi')}
                        className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                            language === 'vi' ? 'bg-cyan-600 text-white' : 'text-gray-400 hover:bg-gray-700'
                        }`}
                    >
                        Tiếng Việt
                    </button>
                </div>
            </div>
            
            {language === 'en' ? <EnglishGuide /> : <VietnameseGuide />}
        </div>
    );
};
