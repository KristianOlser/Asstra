using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Net.Http;

using Amazon.DynamoDBv2;
using Amazon.DynamoDBv2.DocumentModel;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

// If you rename this namespace, you will need to update the invocation shim
// to match if you intend to test the function with 'amplify mock function'
namespace getAssetFunction
{
    // If you rename this class, you will need to update the invocation shim
    // to match if you intend to test the function with 'amplify mock function'
    public class getAssetFunction
    {
        /// <summary>
        /// A Lambda function to respond to HTTP Get methods from API Gateway
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The list of blogs</returns>
        /// <remarks>
        /// If you rename this function, you will need to update the invocation shim
        /// to match if you intend to test the function with 'amplify mock function'
        /// </remarks>
#pragma warning disable CS1998
    
    public async Task<APIGatewayProxyResponse> LambdaHandler(APIGatewayProxyRequest request, ILambdaContext context)
{
    var response = new APIGatewayProxyResponse {
        Headers = new Dictionary<string, string> {
            { "Access-Control-Allow-Origin", "*" },
            { "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" }
        }
    };

    string dateType = request.QueryStringParameters["dateType"];

    DateTimeOffset now = DateTimeOffset.UtcNow;
    long unixNow = now.ToUnixTimeSeconds();

    DateTimeOffset from;
    
    switch(dateType){
        case "1d":
            from = now.AddDays(-1);
        break;
        case "7d":
            from = now.AddDays(-7);
        break;
        case "1m":
            from = now.AddMonths(-1);
        break;
        default:
            from = now.AddDays(-1);
        break;
    }
        long unixFrom = from.ToUnixTimeSeconds();


    try
    {

        // Make API call using HttpClient
        using (var httpClient = new HttpClient())
        {
            var apiResponse = await httpClient.GetAsync("https://finnhub.io/api/v1/stock/candle?symbol=AAPL&resolution=D&from="+unixFrom+"&to="+unixNow+"&token=cggbn89r01qqr8lai2vgcggbn89r01qqr8lai300");
            var apiResponseContent = await apiResponse.Content.ReadAsStringAsync();
            JObject jsonResponse = JObject.Parse(apiResponseContent);

            JArray tArray = (JArray)jsonResponse["t"];
            DateTime[] dateTimeArray = tArray.Select(timestamp => DateTimeOffset.FromUnixTimeSeconds((long)timestamp).DateTime).ToArray();
            string[] formattedArray = dateTimeArray.Select(dateTime => dateTime.ToString("dd.MM.yyyy HH:mm")).ToArray();
            jsonResponse["t"] = new JArray(formattedArray);

            // Set the modified JSON content as the response body
            response.StatusCode = (int)HttpStatusCode.OK;
            response.Body = jsonResponse.ToString();
            response.Headers["Content-Type"] = "application/json";
        }
    }
    catch(Exception ex)
    {
        response.StatusCode = (int)HttpStatusCode.InternalServerError;
        response.Body = $"Error: {ex.Message}";
    }
    return response;
}

    }
}
