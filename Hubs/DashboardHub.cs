using Microsoft.AspNetCore.SignalR;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace SignalRChat.Hubs
{
    public class DashboardHub : Hub
    {
        public async Task SendDashboardUpdate(string dashupdate)
        {
            await Clients.All.SendAsync("ReceiveDashUpdate", dashupdate);
        }

        public async Task SendObjectUpdate(ChartData[] chartUpdate)
        {
            await Clients.All.SendAsync("ReceiveObjUpdate", chartUpdate);
        }
    }

    public class ChartData
    {
        public string Category { get; set; }
        public int Value { get; set; }
    }
}
