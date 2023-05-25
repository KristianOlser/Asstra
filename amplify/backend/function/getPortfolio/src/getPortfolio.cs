using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Net.Http;

using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;


// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.Json.JsonSerializer))]

// If you rename this namespace, you will need to update the invocation shim
// to match if you intend to test the function with 'amplify mock function'
namespace getPortfolio
{
    // If you rename this class, you will need to update the invocation shim
    // to match if you intend to test the function with 'amplify mock function'
    public class getPortfolio
    {
      
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

    try
    {

            response.StatusCode = (int)HttpStatusCode.OK;
            response.Body = dateType.ToString();
            response.Headers["Content-Type"] = "application/json";
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
